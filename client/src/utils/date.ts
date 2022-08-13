import { Moment } from 'moment';
import { FDayTask } from '../components/layout/home/TodaySchedule';

function daysInMonth(month: number) {
  const year = new Date().getFullYear();
  const d = new Date(year, month + 1, 0);
  return d.getDate();
}

function firstDayOfMonth(month: number) {
  const year = new Date().getFullYear();
  const d = new Date(year, month, 1);
  return d.getDay();
}

function convertDayToDate(day: string) {
  return new Date(day);
}

function convertTimeToMomentValue(time: string) {
  return JSON.parse(time) as Moment;
}

function sortFunction(a: FDayTask, b: FDayTask) {
  var dateA = new Date(a.time).getTime();
  var dateB = new Date(b.time).getTime();
  return dateA - dateB;
}

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export {
  daysInMonth,
  firstDayOfMonth,
  months,
  convertDayToDate,
  convertTimeToMomentValue,
  sortFunction,
};
