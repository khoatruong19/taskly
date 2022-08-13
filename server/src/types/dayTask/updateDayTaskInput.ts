import { __Type } from 'graphql';
import { Field, ID, InputType } from 'type-graphql';

@InputType()
export class UpdateDayTaskInput {
  @Field((__Type) => ID)
  id: number;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  date: string;

  @Field()
  time: Date;

  @Field({ nullable: true })
  icon?: string;
}
