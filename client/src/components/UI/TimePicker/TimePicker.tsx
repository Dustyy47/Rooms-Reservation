import { padZero } from '@/helpers/timeHelpers';
import { useState } from 'react';
import {
  MultipleSelection,
  PickHandler
} from '../MultipleSelection/MultipleSelection';

interface TimePickerProps {
  hours: number[];
  pickedHour: number | null;
  pickedMinute: number | null;
  setPickedHour: (hour: number) => any;
  setPickedMinute: (minute: number | null) => any;
  getMinutes: (hour: number) => number[]; // Должно вернуть список доступных минут
  isDisabledHours: boolean;
  label?: string;
}

export function TimePicker({
  hours,
  pickedHour,
  pickedMinute,
  setPickedHour,
  setPickedMinute,
  getMinutes,
  isDisabledHours,
  label
}: TimePickerProps) {
  const [minutes, setMinutes] = useState<number[]>([]);

  const handlePickTime: PickHandler = (item, keyname) => {
    if (keyname === 'hours') {
      setPickedHour(item as number);
      setPickedMinute(null);
      setMinutes(getMinutes(item as number));
    } else {
      setPickedMinute(item as number);
    }
  };

  return (
    <MultipleSelection
      onPick={handlePickTime}
      label={label || ''}
      groups={[
        {
          name: padZero(pickedHour),
          data: hours,
          placeholder: '--',
          keyName: 'hours',
          disabled: isDisabledHours
        },
        {
          name: padZero(pickedMinute),
          data: minutes,
          placeholder: '--',
          keyName: 'minutes',
          disabled: !pickedHour
        }
      ]}
    />
  );
}
