import { ApolloServer } from 'apollo-server-fastify';
import Fastify, { FastifyInstance } from 'fastify';
import { buildSchema } from 'type-graphql';
import { GreetingResolver } from './resolvers/greeting';
import { ApolloServerPlugin } from 'apollo-server-plugin-base';
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} from 'apollo-server-core';
import { User } from './entities/User';
import { createConnection } from 'typeorm';
import dotenv from 'dotenv';
import { UserResolver } from './resolvers/user';
import { Context } from './types/Context';
import cookie from '@fastify/cookie';
import { Secret, verify } from 'jsonwebtoken';
import { UserAuthPayload } from './types/user/UserAuthPayload';
import { createToken, sendRefreshToken } from './utils/auth';
import cors from '@fastify/cors';
import { WeeklyTask } from './entities/WeeklyTask';
import { WeeklyTaskResolver } from './resolvers/weeklyTask';
import { DayTask } from './entities/DayTask';
import { DayTaskResolver } from './resolvers/dayTask';
import { __prod__ } from './constants';
import path from 'path';

function fastifyAppClosePlugin(app: FastifyInstance): ApolloServerPlugin {
  return {
    async serverWillStart() {
      return {
        async drainServer() {
          await app.close();
        },
      };
    },
  };
}

async function main() {
  dotenv.config();
  try {
    const connection = await createConnection({
      type: 'postgres',
      ...(__prod__
        ? { url: process.env.DATABASE_URL as string }
        : {
            database: 'taskly',
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
          }),
      logging: true,
      ...(__prod__
        ? {
            extra: {
              ssl: {
                rejectUnauthorized: false,
              },
            },
            ssl: true,
          }
        : {}),
      ...(__prod__ ? {} : { synchronize: true }),
      entities: [User, WeeklyTask, DayTask],
      migrations: [path.join(__dirname, '/migrations/*')],
    });

    if (__prod__) await connection.runMigrations();

    const app = Fastify();

    app.get('/', async function (req, reply) {
      return { status: 'OK' };
    });

    app.get('/refresh_token', async function (req, reply) {
      const refreshToken =
        req.cookies[process.env.REFRESH_TOKEN_COOKIE_NAME as string];
      if (!refreshToken) {
        return reply.code(401).send('Unauthorized');
      }

      try {
        const decodedUser = verify(
          refreshToken,
          process.env.REFRESH_TOKEN_SECRET as Secret
        ) as UserAuthPayload;

        const existingUser = await User.findOne({
          where: { id: decodedUser.userId },
        });
        if (
          !existingUser ||
          existingUser.tokenVersion !== decodedUser.tokenVersion
        )
          return reply.code(401).send('Unauthorized');
        sendRefreshToken(reply, existingUser);
        return {
          success: true,
          accessToken: createToken('accessToken', existingUser),
        };
      } catch (error) {
        console.log('Error refreshing token, ', error);
        return reply.code(403).send('Forbidden');
      }
    });

    app.register(cookie, {
      secret: 'my-secret',
      parseOptions: {
        domain: __prod__ ? '.vercel.app' : undefined,
        maxAge: 1000 * 60 * 60,
        httpOnly: true,
        secure: __prod__,
        sameSite: 'lax',
      },
    });

    const schema = await buildSchema({
      validate: false,
      resolvers: [
        GreetingResolver,
        UserResolver,
        WeeklyTaskResolver,
        DayTaskResolver,
      ],
    });

    const server = new ApolloServer({
      schema,
      csrfPrevention: true,
      cache: 'bounded',
      plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer: app.server }),
        ApolloServerPluginLandingPageLocalDefault({ embed: true }),
      ],
      context: ({ request, reply }: Context) => ({ request, reply }),
    });

    await server.start();
    app.register(
      server.createHandler({
        cors: {
          origin: __prod__
            ? (process.env.CORS_ORIGIN_PROD as string)
            : (process.env.CORS_ORIGIN_DEV as string),
          credentials: true,
        },
      })
    );

    await app.register(cors, {
      origin: __prod__
        ? (process.env.CORS_ORIGIN_PROD as string)
        : (process.env.CORS_ORIGIN_DEV as string),
      credentials: true,
    });

    const PORT = process.env.PORT || 4000;
    await app.listen({ port: Number(PORT), host: '0.0.0.0' });

    console.log(
      `Server is running on port ${PORT}. Graphql: http://localhost:${PORT}${server.graphqlPath}`
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}
main();
