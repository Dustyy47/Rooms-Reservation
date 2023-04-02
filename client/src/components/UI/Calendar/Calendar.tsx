import { ArrowButton } from '@/components/SVG/ArrowButton';
import { days, months } from '@/constants/Dates';
import { useState } from 'react';
import { CalendarDate } from './CalendarDate';

export function Calendar() {
  const [date, setDate] = useState(new Date());
  const [activeDate, setActiveDate] = useState(new Date());

  function handleChangeDate(incrementV: number) {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + incrementV);
    setDate(newDate);
  }

  function getDays() {
    const firstDay = new Date(date);
    firstDay.setDate(1);
    const days = [];
    for (let i = 1; i < 7; i++) {
      if (i < firstDay.getDay()) {
        days.push(null);
      } else break;
    }
    const firstMonth = firstDay.getMonth();
    while (firstDay.getMonth() === firstMonth) {
      days.push(new Date(firstDay));
      firstDay.setDate(firstDay.getDate() + 1);
    }
    return [...days];
  }

  function handlePickDate(date: Date) {
    setActiveDate(date);
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
            type={el?.getTime() == activeDate.getTime() ? 'active' : 'base'}
          ></CalendarDate>
        ))}
      </div>
    </div>
  );
}
