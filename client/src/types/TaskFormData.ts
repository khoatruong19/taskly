import { Moment } from 'moment';

export type TaskFormData = {
  title: string;
  description: string;
  date: Date;
  icon: string;
  time: Moment;
};
