export const nextHumanId = (prefix, currentCount, base) => {
    const value = base + currentCount;
    return `${prefix}-${String(value).padStart(3, '0')}`;
};
export const nextShortId = (prefix, currentCount) => `${prefix}-0${currentCount + 1}`;
