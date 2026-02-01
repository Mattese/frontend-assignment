import dayjs from 'dayjs';
import 'dayjs/locale/cs';

dayjs.locale('cs');

const getCurrentDate = (format: string = 'D. MMMM YYYY'): string => {
  const today = dayjs().format(format);

  return today;
};

export {getCurrentDate};
