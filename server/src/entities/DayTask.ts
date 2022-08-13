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
export class DayTask extends BaseEntity {
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
  userId!: string;

  @Field()
  @Column()
  time: Date;

  @Field()
  @Column()
  date: string;

  @Field()
  @Column({ default: '⭐' })
  icon: string;

  @Field()
  @Column({ default: false })
  done: boolean;

  @ManyToOne(() => User, (user) => user.dayTasks)
  user: User;
}
