import { Arg, Ctx, Query, Resolver, UseMiddleware } from 'type-graphql';
import 'reflect-metadata';
import { checkAuth } from '../middleware/checkAuth';
import { Context } from '../types/Context';
import { User } from '../entities/User';

@Resolver()
export class GreetingResolver {
  @Query((_return) => String)
  async hello(@Arg('name') name: string): Promise<string> {
    return `Hello ${name}`;
  }
}
