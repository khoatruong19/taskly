import { Field, ObjectType } from 'type-graphql';
import { User } from '../../entities/User';
import { FieldError } from '../FieldError';
import { MutationResponse } from '../MutationResponse';

@ObjectType({ implements: MutationResponse })
export class UserMutationResponse implements MutationResponse {
  code: number;
  success: boolean;
  message?: string;

  @Field({ nullable: true })
  user?: User;

  @Field({ nullable: true })
  accessToken?: string;

  @Field((__Type) => [FieldError], { nullable: true })
  errors?: FieldError[];
}
