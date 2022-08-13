export const convertDayToDate = (day: string) => {
  return new Date(day);
};

export const convertTimeToMomentValue = (time: string) => {
  return JSON.parse(time);
};
