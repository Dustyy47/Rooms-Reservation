import { ArrowButton } from '@/components/SVG/ArrowButton';
import { days, months } from '@/constants/Dates';
import { getMaxDate } from '@/helpers/timeHelpers';
import { useState } from 'react';
import { CalendarDate, CalendarDateType } from './CalendarDate';

interface CalendarProps{
  onPick : (d:Date) => any 
}

export function Calendar({onPick}:CalendarProps) {
  const [date, setDate] = useState(new Date());
  const [activeDate, setActiveDate] = useState(new Date());

  function handleChangeDate(incrementV: number) {
    const newDate = new Date(date);
    const currentDay = new Date();
    newDate.setMonth(newDate.getMonth() + incrementV);
    if (
      (newDate.getMonth() < currentDay.getMonth() &&
        newDate.getFullYear() <= currentDay.getFullYear()) ||
      newDate.getTime() >= getMaxDate(4).getTime()
    ) {
      return;
    }
    setDate(newDate);
  }

  function getDays() {
    const tempDay = new Date(date);
    tempDay.setDate(1);
    const days = [];
    let firstDay = tempDay.getDay();
    firstDay = firstDay === 0 ? 7 : firstDay;
    for (let i = 1; i < 7; i++) {
      if (i < firstDay) {
        days.push(null);
      } else break;
    }
    const firstMonth = tempDay.getMonth();
    while (tempDay.getMonth() === firstMonth) {
      days.push(new Date(tempDay));
      tempDay.setDate(tempDay.getDate() + 1);
    }
    return [...days];
  }

  function handlePickDate(date: Date) {
    setActiveDate(date);
    onPick(date);
  }

  function getDateType(date: Date | null): CalendarDateType {
    if (!date) return 'disabled';
    if ([0, 6].includes(date.getDay())) return 'disabled';
    if (date?.getTime() == activeDate.getTime()) return 'active';
    return 'base';
  }

  return (
    <div className=' w-[25rem] flex-col items-center rounded-common bg-c-grey p-[1.2rem] pb-[2.4rem]'>
      <nav className='mb-[1rem] flex w-full items-center justify-between'>
        <ArrowButton onClick={() => handleChangeDate(-1)} direction='left' />
        <div className='flex w-[70%] items-center justify-center text-[1.3rem] font-bold'>
          {months[date.getMonth()]} {date.getFullYear()}
        </div>
        <ArrowButton onClick={() => handleChangeDate(1)} />
      </nav>
      <div className='grid w-full  grid-cols-7 gap-2'>
        {days.map((el, index) => (
          <div
            key={index}
            className='flex items-center justify-center text-c-greyLight'
          >
            {el}
          </div>
        ))}
        {getDays().map((el, index) => (
          <CalendarDate
            onClick={handlePickDate}
            key={index}
            date={el}
            type={getDateType(el)}
          ></CalendarDate>
        ))}
      </div>
    </div>
  );
}
