export const toDateString = (date) => date.toISOString().slice(0, 10);
export const addMonths = (date, months) => {
    const copy = new Date(date);
    copy.setMonth(copy.getMonth() + months);
    return copy;
};
