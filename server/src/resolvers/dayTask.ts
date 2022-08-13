import { __Type } from 'graphql';
import {
  Arg,
  Ctx,
  ID,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql';
import { DayTask } from '../entities/DayTask';
import { checkAuth } from '../middleware/checkAuth';
import { Context } from '../types/Context';
import { CreateDayTaskInput } from '../types/dayTask/createDayTaskInput';
import { DayTaskMutationResponse } from '../types/dayTask/DayTaskMutationResponse';
import { UpdateDayTaskInput } from '../types/dayTask/updateDayTaskInput';
import { serverErrorReturn } from '../utils/serverErrorReturn';

@Resolver()
export class DayTaskResolver {
  @Query((_return) => DayTaskMutationResponse, { nullable: true })
  @UseMiddleware(checkAuth)
  async getDayTasksByDate(
    @Ctx() { user }: Context,
    @Arg('date') date: string
  ): Promise<DayTaskMutationResponse> {
    try {
      const tasks = await DayTask.find({
        where: { userId: user.userId, date },
      });
      return {
        code: 200,
        success: true,
        message: 'Get all day tasks succesfully!',
        tasks,
      };
    } catch (error) {
      serverErrorReturn();
    }
    return serverErrorReturn();
  }

  @Mutation((_return) => DayTaskMutationResponse)
  @UseMiddleware(checkAuth)
  async createDayTask(
    @Ctx() { user }: Context,
    @Arg('createInput') createInput: CreateDayTaskInput
  ): Promise<DayTaskMutationResponse> {
    try {
      const { title, ...rest } = createInput;

      const task = DayTask.create({
        userId: user.userId,
        title: title.length < 0 ? 'Untitled' : title,
        ...rest,
      });

      await task.save();

      return {
        code: 201,
        success: true,
        message: 'Create day task successfully!',
        task,
      };
    } catch (error) {
      serverErrorReturn();
    }
    return serverErrorReturn();
  }

  @Mutation((_return) => DayTaskMutationResponse)
  @UseMiddleware(checkAuth)
  async updateDayTask(
    @Arg('updateInput') updateInput: UpdateDayTaskInput
  ): Promise<DayTaskMutationResponse> {
    try {
      const { id, title, ...rest } = updateInput;

      const existingTask = await DayTask.findOne({
        where: { id: Number(id) },
      });

      if (!existingTask) {
        return {
          code: 404,
          success: false,
          message: 'Day task not found!',
        };
      }

      existingTask.title = title.length > 0 ? title : 'Untitled';
      existingTask.description = rest.description;
      existingTask.time = rest.time;
      existingTask.date = rest.date;
      if (rest.icon) existingTask.icon = rest.icon;

      await existingTask.save();

      return {
        code: 201,
        success: true,
        message: 'Update day task successfully!',
        task: existingTask,
      };
    } catch (error) {
      serverErrorReturn();
    }
    return serverErrorReturn();
  }

  @Mutation((_return) => DayTaskMutationResponse)
  @UseMiddleware(checkAuth)
  async toggleDayTask(
    @Arg('ID', (__Type) => ID) id: number
  ): Promise<DayTaskMutationResponse> {
    try {
      const existingTask = await DayTask.findOne({
        where: { id: Number(id) },
      });

      if (!existingTask) {
        return {
          code: 404,
          success: false,
          message: 'Day task not found!',
        };
      }

      existingTask.done = !existingTask.done;

      await existingTask.save();

      return {
        code: 201,
        success: true,
        message: 'Toggle day task successfully!',
        task: existingTask,
      };
    } catch (error) {
      serverErrorReturn();
    }
    return serverErrorReturn();
  }

  @Mutation((_return) => DayTaskMutationResponse)
  @UseMiddleware(checkAuth)
  async deleteDayTask(
    @Ctx() { user }: Context,
    @Arg('id', (__Type) => ID) id: number
  ): Promise<DayTaskMutationResponse> {
    try {
      const existingTask = await DayTask.findOne({
        where: { id: Number(id) },
      });

      if (!existingTask) {
        return {
          code: 404,
          success: false,
          message: 'Day task not found!',
        };
      }

      await existingTask.remove();

      return {
        code: 201,
        success: true,
        message: 'Delete day task successfully!',
      };
    } catch (error) {
      serverErrorReturn();
    }
    return serverErrorReturn();
  }
}
