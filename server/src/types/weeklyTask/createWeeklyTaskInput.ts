import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateWeeklyTaskInput {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  date: string;

  @Field({ nullable: true })
  time?: string;

  @Field({ nullable: true })
  icon?: string;
}
