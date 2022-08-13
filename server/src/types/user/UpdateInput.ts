import { Field, InputType } from 'type-graphql';

@InputType()
export class UpdateInput {
  @Field()
  username: string;

  @Field()
  avatar: string;
}
