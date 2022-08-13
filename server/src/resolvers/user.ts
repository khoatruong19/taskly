import {
  Arg,
  Ctx,
  ID,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql';
import { User } from '../entities/User';
import { RegisterInput } from '../types/user/RegisterInput';
import { UserMutationResponse } from '../types/user/UserMutationResponse';
import argon2 from 'argon2';
import { serverErrorReturn } from '../utils/serverErrorReturn';
import { LoginInput } from '../types/user/LoginInput';
import { userInputValidation } from '../utils/userInputValidation';
import { createToken, sendRefreshToken } from '../utils/auth';
import { Context } from '../types/Context';
import { UserAuthPayload } from '../types/user/UserAuthPayload';
import { Secret, verify } from 'jsonwebtoken';
import { checkAuth } from '../middleware/checkAuth';
import { UpdateInput } from '../types/user/UpdateInput';

@Resolver()
export class UserResolver {
  @Query((_return) => User, { nullable: true })
  async me(@Ctx() { request }: Context): Promise<User | null | undefined> {
    const authHeader = request.headers['authorization'] as string;
    const accessToken = authHeader && authHeader.split(' ')[1];

    if (!accessToken) return null;

    const decodedUser = verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET as Secret
    ) as UserAuthPayload;

    const user = await User.findOne({ where: { id: decodedUser.userId } });

    if (user) return user;
    else return null;
  }
  @Mutation((_return) => UserMutationResponse)
  async register(
    @Arg('registerInput') registerInput: RegisterInput
  ): Promise<UserMutationResponse> {
    try {
      const { username, password } = registerInput;
      const validationRel = userInputValidation(username, password);
      console.log(validationRel);
      if (validationRel !== true) return validationRel;

      const existingUser = await User.findOne({ where: { username } });

      if (existingUser) {
        return {
          code: 400,
          success: false,
          message: 'Username already exists!',
          errors: [
            {
              field: 'username',
              message: 'Username already exists!',
            },
          ],
        };
      }

      const hashedPassword = await argon2.hash(password);

      const user = User.create({ username, password: hashedPassword });

      await user.save();
      return {
        code: 201,
        success: true,
        message: 'User registration successfully!',
        user,
      };
    } catch (error) {
      serverErrorReturn();
    }
    return serverErrorReturn();
  }

  @Mutation((_return) => UserMutationResponse)
  async login(
    @Arg('loginInput') loginInput: LoginInput,
    @Ctx() { reply, user }: Context
  ): Promise<UserMutationResponse> {
    try {
      const { username, password } = loginInput;
      const validationRel = userInputValidation(username, password);
      if (validationRel !== true) return validationRel;

      const foundUser = await User.findOne({ where: { username } });

      if (!foundUser) {
        return {
          code: 404,
          success: false,
          message: 'Username is not valid!',
          errors: [
            {
              field: 'username',
              message: 'Username is not valid!',
            },
          ],
        };
      }

      const verifyPassword = await argon2.verify(foundUser.password, password);

      if (!verifyPassword) {
        return {
          code: 404,
          success: false,
          message: 'Password is not valid!',
          errors: [
            {
              field: 'password',
              message: 'Password is not valid!',
            },
          ],
        };
      }

      sendRefreshToken(reply, foundUser);

      return {
        code: 200,
        success: true,
        message: 'User login successfully!',
        user: foundUser,
        accessToken: createToken('accessToken', foundUser),
      };
    } catch (error) {
      serverErrorReturn();
    }
    return serverErrorReturn();
  }
  @Mutation((_return) => UserMutationResponse)
  async logout(
    @Arg('userId', (_type) => ID) userId: string,
    @Ctx() { reply }: Context
  ): Promise<UserMutationResponse> {
    const existingUser = await User.findOne({ where: { id: userId } });
    if (!existingUser) {
      return {
        code: 400,
        success: false,
      };
    }
    existingUser.tokenVersion += 1;
    await existingUser.save();
    reply.clearCookie(process.env.REFRESH_TOKEN_COOKIE_NAME as string, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/refresh_token',
    });

    return {
      code: 200,
      success: true,
    };
  }
  @Mutation((_return) => UserMutationResponse)
  @UseMiddleware(checkAuth)
  async update(
    @Ctx() { user }: Context,
    @Arg('updateInput') updateInput: UpdateInput
  ): Promise<UserMutationResponse> {
    try {
      const existingUser = await User.findOne({ where: { id: user.userId } });

      if (!existingUser)
        return {
          code: 400,
          success: false,
          message: 'No user existing',
        };

      if (updateInput.username.length < 3) {
        return {
          code: 400,
          success: false,
          message: 'Username length must be greater than 2',
        };
      }

      if (updateInput.username.includes(' ')) {
        return {
          code: 400,
          success: false,
          message: 'Username cant have space { } character',
        };
      }

      existingUser.username = updateInput.username;
      existingUser.avatar = updateInput.avatar;

      await existingUser.save();

      return {
        code: 200,
        success: true,
        message: 'User updated!',
        user: existingUser,
      };
    } catch (error) {
      serverErrorReturn();
    }
    return serverErrorReturn();
  }
}
