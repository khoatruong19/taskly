import { Field, ObjectType } from 'type-graphql';
import { DayTask } from '../../entities/DayTask';
import { MutationResponse } from '../MutationResponse';

@ObjectType({ implements: MutationResponse })
export class DayTaskMutationResponse implements MutationResponse {
  code: number;
  success: boolean;
  message?: string;

  @Field((__Type) => DayTask, { nullable: true })
  task?: DayTask;

  @Field((__Type) => [DayTask])
  tasks?: DayTask[];
}
