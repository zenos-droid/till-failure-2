export const nextHumanId = (prefix: string, currentCount: number, base: number) => {
  const value = base + currentCount;
  return `${prefix}-${String(value).padStart(3, '0')}`;
};

export const nextShortId = (prefix: string, currentCount: number) => `${prefix}-0${currentCount + 1}`;
