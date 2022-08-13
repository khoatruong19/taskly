import { Field, ObjectType } from 'type-graphql';
import { WeeklyTask } from '../../entities/WeeklyTask';
import { MutationResponse } from '../MutationResponse';

@ObjectType({ implements: MutationResponse })
export class WeeklyTaskMutationResponse implements MutationResponse {
  code: number;
  success: boolean;
  message?: string;

  @Field((__Type) => WeeklyTask, { nullable: true })
  task?: WeeklyTask;

  @Field((__Type) => [WeeklyTask], { nullable: true })
  tasks?: WeeklyTask[];
}
