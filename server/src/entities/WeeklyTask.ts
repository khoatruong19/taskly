import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';

@ObjectType()
@Entity()
export class WeeklyTask extends BaseEntity {
  @Field((_type) => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ default: 'Untitled' })
  title!: string;

  @Field()
  @Column({ default: '' })
  description!: string;

  @Field()
  @Column()
  date: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  time: string;

  @Field()
  @Column({ default: '⭐' })
  icon: string;

  @Field()
  @Column()
  userId!: string;

  @ManyToOne(() => User, (user) => user.weeklyTasks)
  user: User;
}
