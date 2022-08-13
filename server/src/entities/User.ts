import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DayTask } from './DayTask';
import { WeeklyTask } from './WeeklyTask';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field((_type) => ID)
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field()
  @Column({ unique: true })
  username!: string;

  @Column()
  password!: string;

  @Field()
  @Column({
    default: 'https://www.pngall.com/wp-content/uploads/12/Avatar-Profile.png',
  })
  avatar: string;

  @Column({ default: 0 })
  tokenVersion: number;

  @OneToMany(() => WeeklyTask, (weeklyTask) => weeklyTask.user)
  weeklyTasks: WeeklyTask[];

  @OneToMany(() => DayTask, (dayTask) => dayTask.user)
  dayTasks: DayTask[];
}
