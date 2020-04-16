import React, {useState} from 'react';

export const useDateFormat = (date: any) => {
  const [months] = useState<string[]>([
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]);

  const [weeks] = useState<string[]>([
    'Wen',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
    'Sun',
  ]);

  const getDateFormat = () => {
    const datetime: Date = new Date(date);
    const dateTime: string =
      weeks[datetime.getDay()] +
      '., ' +
      datetime.getDate() +
      ' ' +
      months[datetime.getMonth()] +
      '. ' +
      datetime.getFullYear();
    const hours: string =
      datetime.getHours() +
      ':' +
      (datetime.getMinutes() >= 10
        ? datetime.getMinutes()
        : '0' + datetime.getMinutes());

    return {dateTime, hours};
  };

  return {weeks, months, getDateFormat};
};
