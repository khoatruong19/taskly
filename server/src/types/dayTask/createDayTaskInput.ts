import { __Type } from 'graphql';
import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateDayTaskInput {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  date: string;

  @Field((__Type) => Date)
  time: Date;

  @Field({ nullable: true })
  icon?: string;
}
