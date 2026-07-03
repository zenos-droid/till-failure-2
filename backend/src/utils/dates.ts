export const toDateString = (date: Date) => date.toISOString().slice(0, 10);

export const addMonths = (date: Date, months: number) => {
  const copy = new Date(date);
  copy.setMonth(copy.getMonth() + months);
  return copy;
};
