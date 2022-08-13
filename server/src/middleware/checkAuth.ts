import { AuthenticationError } from 'apollo-server-core';
import { Secret, verify } from 'jsonwebtoken';
import { MiddlewareFn } from 'type-graphql';
import { Context } from '../types/Context';
import { UserAuthPayload } from '../types/user/UserAuthPayload';

export const checkAuth: MiddlewareFn<Context> = ({ context }, next) => {
  try {
    const authHeader = context.request.headers['authorization'] as string;
    const accessToken = authHeader && authHeader.split(' ')[1];

    if (!accessToken) throw new AuthenticationError('Not authenticated!');

    const decodedUser = verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET as Secret
    ) as UserAuthPayload;

    context.user = decodedUser;
    return next();
  } catch (error) {
    throw new AuthenticationError(
      `Error authenticating user, ${JSON.stringify(error)}`
    );
  }
};