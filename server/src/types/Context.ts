import { FastifyReply, FastifyRequest } from 'fastify';
import { UserAuthPayload } from './user/UserAuthPayload';

export interface Context {
  request: FastifyRequest;
  reply: FastifyReply;
  user: UserAuthPayload;
}
