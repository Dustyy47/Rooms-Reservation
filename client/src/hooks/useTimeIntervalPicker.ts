import { getISOTime } from '@/helpers/timeHelpers';
import { OrderTime } from '@/types/Order';
import { useCallback, useMemo, useRef, useState } from 'react';

type Time = { hours: number; minutes: number };

type EndTimePickMeta = {
  minHourFromOrdered: null | number;
  minMinuteFromOrdered: null | number;
};

//TODO Получать от сервера
const START_TIME: Time = { hours: 8, minutes: 30 };
const END_TIME: Time = { hours: 21, minutes: 0 };

export function useTimeIntervalPicker(makedOrders: OrderTime[] | null) {
  const [startPickedHour, setPickedHour] = useState<number | null>(null);
  const [startPickedMinute, setPickedMinute] = useState<number | null>(null);

  const [endPickedHour, setEndPickedHour] = useState<number | null>(null);
  const [endPickedMinute, setEndPickedMinute] = useState<number | null>(null);

  const endTimePickMeta = useRef<EndTimePickMeta>({
    minHourFromOrdered: null,
    minMinuteFromOrdered: null
  });

  const freeEndHours = useMemo(() => {
    if (
      startPickedMinute === null ||
      startPickedHour === null ||
      makedOrders === null
    ) {
      return [];
    }

    let minHourFromOrdered = END_TIME.hours;
    let minMinuteFromOrdered = 60;

    for (let interval of makedOrders) {
      const start = new Date(interval.start);
      if (
        start.getHours() >= startPickedHour &&
        start.getHours() <= minHourFromOrdered
      ) {
        if (
          start.getHours() === minHourFromOrdered ||
          minHourFromOrdered === END_TIME.hours
        ) {
          if (start.getMinutes() < minMinuteFromOrdered) {
            minMinuteFromOrdered = start.getMinutes();
          }
        } else {
          minMinuteFromOrdered = start.getMinutes();
        }
        minHourFromOrdered = start.getHours();
      }
    }
    const freeHours = [];
    for (let i = startPickedHour; i <= minHourFromOrdered; i++) {
      freeHours.push(i);
    }
    endTimePickMeta.current = { minHourFromOrdered, minMinuteFromOrdered };
    return freeHours;
  }, [startPickedMinute, startPickedHour]);

  const freeStartHours = useMemo(() => {
    const orderedHours = new Set();
    if (!makedOrders) return [];
    for (let interval of makedOrders) {
      for (
        let i = new Date(interval.start).getHours() + 1;
        i < new Date(interval.end).getHours();
        i++
      ) {
        orderedHours.add(i);
      }
    }
    const freeHours = [];
    for (let i = START_TIME.hours; i <= END_TIME.hours; i++) {
      if (!orderedHours.has(i)) freeHours.push(i);
    }
    return freeHours;
  }, [makedOrders]);

  function getFreeEndMinutes(endPickedHour: number) {
    const freeMinutes = [];
    let start = 0;
    let end = 60;

    if (endPickedHour === startPickedHour) {
      start = startPickedMinute! + 1;
    }
    if (endPickedHour === endTimePickMeta.current.minHourFromOrdered) {
      end = endTimePickMeta.current.minMinuteFromOrdered || 60;
    }
    if (endPickedHour === END_TIME.hours) {
      end = END_TIME.minutes;
    }
    for (let i = start; i < end; i++) {
      freeMinutes.push(i);
    }
    return freeMinutes;
  }

  function getFreeStartMinutes(makedOrders: OrderTime[], hour: number) {
    const orderedMinutes = new Set();
    for (let interval of makedOrders) {
      const start = new Date(interval.start);
      const end = new Date(interval.end);
      if (end.getHours() < hour) continue;
      if (start.getHours() <= hour) {
        let endMinute = 60;
        if (start.getHours() === end.getHours()) {
          endMinute = end.getMinutes();
        }
        let startMinute = 0;
        if (start.getHours() === hour) {
          startMinute = start.getMinutes();
        } else if (end.getHours() === hour) {
          endMinute = end.getMinutes();
        }
        for (let i = startMinute; i <= endMinute; i++) {
          orderedMinutes.add(i);
        }
      }
    }
    const freeMinutes = [];
    let startTimeMinute = 0;
    if (hour === START_TIME.hours) {
      startTimeMinute = START_TIME.minutes;
    }
    let endTimeMinute = 59;
    if (hour === END_TIME.hours) {
      endTimeMinute = END_TIME.minutes;
    }
    for (let i = startTimeMinute; i <= endTimeMinute; i++) {
      if (!orderedMinutes.has(i)) freeMinutes.push(i);
    }
    return freeMinutes;
  }

  const reset = useCallback(() => {
    setPickedHour(null);
    setPickedMinute(null);
    setEndPickedHour(null);
    setEndPickedMinute(null);
  }, []);

  function getISOInterval(date: Date) {
    if (
      startPickedHour === null ||
      startPickedMinute === null ||
      endPickedHour === null ||
      endPickedMinute === null
    )
      return null;

    const offset = new Date().getTimezoneOffset() / 60;
    console.log('OFFSET', offset);
    const dateISO = date.toISOString().split('T')[0];
    const start =
      dateISO + getISOTime(startPickedHour + offset, startPickedMinute);
    const end = dateISO + getISOTime(endPickedHour + offset, endPickedMinute);
    return {
      start,
      end
    };
  }

  return {
    freeStartHours,
    freeEndHours,
    getFreeStartMinutes,
    getFreeEndMinutes,
    getISOInterval,
    reset,
    states: {
      start: {
        hour: startPickedHour,
        minute: startPickedMinute,
        setHour: setPickedHour,
        setMinute: setPickedMinute
      },
      end: {
        hour: endPickedHour,
        minute: endPickedMinute,
        setHour: setEndPickedHour,
        setMinute: setEndPickedMinute
      }
    }
  };
}
