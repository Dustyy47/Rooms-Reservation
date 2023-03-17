import { OrderDates } from '@/models/Room';
import { useMemo, useState } from 'react';

export function useDatePicker(orderedDates: OrderDates) {
  const [date, setDate] = useState({
    year: '',
    month: '',
    day: ''
  });
  const datesSelections = useMemo(() => {
    return [
      {
        data: Object.keys(orderedDates),
        name: date.year,
        placeholder: 'Год',
        disabled: false,
        keyName: 'year'
      },
      {
        data: orderedDates[date.year]
          ? Object.keys(orderedDates[date.year])
          : [],
        name: date.month,
        placeholder: 'Месяц',
        disabled: date.year === '',
        keyName: 'month'
      },
      {
        data:
          orderedDates[date.year] && orderedDates[date.year][date.month]
            ? Object.keys(orderedDates[date.year][date.month])
            : [],
        name: date.day,
        placeholder: 'День',
        disabled: date.year === '' || date.month === '',
        keyName: 'day'
      }
    ];
  }, [date, orderedDates]);

  function handlePickDate(item: string, keyName: string) {
    switch (keyName) {
      case 'year':
        setDate({
          year: item,
          month: '',
          day: ''
        });
        break;
      case 'month':
        setDate((prev) => ({
          year: prev.year,
          month: item,
          day: ''
        }));
        break;
      case 'day':
        setDate((prev) => ({
          year: prev.year,
          month: prev.month,
          day: item
        }));
    }
  }
  return {
    datesSelections,
    handlePickDate
  };
}
