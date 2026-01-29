import dayjs from 'dayjs';

const getCurrentDate = (format: string = 'YYYY-MM-DD'): string => {
  const today = dayjs().format(format);

  return today;
};

export {getCurrentDate};
