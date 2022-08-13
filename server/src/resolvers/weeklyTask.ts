import {
  Arg,
  Ctx,
  ID,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql';
import { WeeklyTask } from '../entities/WeeklyTask';
import { checkAuth } from '../middleware/checkAuth';
import { Context } from '../types/Context';
import { CreateWeeklyTaskInput } from '../types/weeklyTask/createWeeklyTaskInput';
import { UpdateWeeklyTaskInput } from '../types/weeklyTask/updateWeeklyTaskInput';
import { WeeklyTaskMutationResponse } from '../types/weeklyTask/WeeklyTaskMutationResponse';
import { serverErrorReturn } from '../utils/serverErrorReturn';

@Resolver()
export class WeeklyTaskResolver {
  @Query((_return) => WeeklyTaskMutationResponse, { nullable: true })
  @UseMiddleware(checkAuth)
  async getAllWeeklyTasks(
    @Ctx() { user }: Context
  ): Promise<WeeklyTaskMutationResponse> {
    try {
      const weeklyTasks = await WeeklyTask.find({
        where: { userId: user.userId },
      });
      return {
        code: 200,
        success: true,
        message: 'Get all weekly tasks succesfully!',
        tasks: weeklyTasks,
      };
    } catch (error) {
      serverErrorReturn();
    }
    return serverErrorReturn();
  }

  @Mutation((_return) => WeeklyTaskMutationResponse)
  @UseMiddleware(checkAuth)
  async createWeeklyTask(
    @Ctx() { user }: Context,
    @Arg('createInput') createInput: CreateWeeklyTaskInput
  ): Promise<WeeklyTaskMutationResponse> {
    try {
      const { title, ...rest } = createInput;

      const task = WeeklyTask.create({
        title: title.length > 0 ? title : 'Untitled',
        ...rest,
        userId: user.userId,
      });

      await task.save();

      return {
        code: 201,
        success: true,
        message: 'Create weekly task successfully!',
        task,
      };
    } catch (error) {
      serverErrorReturn();
    }
    return serverErrorReturn();
  }

  @Mutation((_return) => WeeklyTaskMutationResponse)
  @UseMiddleware(checkAuth)
  async updateWeeklyTask(
    @Ctx() { user }: Context,
    @Arg('updateInput') updateInput: UpdateWeeklyTaskInput
  ): Promise<WeeklyTaskMutationResponse> {
    try {
      const { id, title, ...rest } = updateInput;

      const existingTask = await WeeklyTask.findOne({
        where: { id: Number(id) },
      });

      if (!existingTask) {
        return {
          code: 404,
          success: false,
          message: 'Weekly task not found!',
        };
      }

      if (existingTask.userId !== user.userId)
        return {
          code: 401,
          success: false,
          message: `Unauthorized!`,
        };

      existingTask.title = title.length > 0 ? title : 'Untitled';
      existingTask.description = rest.description;
      existingTask.date = rest.date;
      if (rest.icon) existingTask.icon = rest.icon;
      if (rest.time) existingTask.time = rest.time;

      await existingTask.save();

      return {
        code: 201,
        success: true,
        message: 'Update weekly task successfully!',
        task: existingTask,
      };
    } catch (error) {
      console.log(error);
      serverErrorReturn();
    }
    return serverErrorReturn();
  }

  @Mutation((_return) => WeeklyTaskMutationResponse)
  @UseMiddleware(checkAuth)
  async deleteWeeklyTask(
    @Ctx() { user }: Context,
    @Arg('id', (__Type) => ID) id: number
  ): Promise<WeeklyTaskMutationResponse> {
    try {
      const existingTask = await WeeklyTask.findOne({
        where: { id: Number(id) },
      });

      if (!existingTask) {
        return {
          code: 404,
          success: false,
          message: 'Weekly task not found!',
        };
      }

      if (existingTask.userId !== user.userId)
        return {
          code: 401,
          success: false,
          message: `Unauthorized!`,
        };

      await existingTask.remove();

      return {
        code: 201,
        success: true,
        message: 'Delete weekly task successfully!',
      };
    } catch (error) {
      console.log(error);
      serverErrorReturn();
    }
    return serverErrorReturn();
  }
}
