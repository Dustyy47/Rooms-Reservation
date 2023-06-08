const months = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря'
];

export function getMaxDate(monthLimit: number) {
  const monthFirstDate = new Date();
  monthFirstDate.setHours(0);
  monthFirstDate.setMinutes(0);
  monthFirstDate.setSeconds(0);
  monthFirstDate.setDate(1);
  const maxDate = monthFirstDate;
  maxDate.setMonth(monthFirstDate.getMonth() + monthLimit);
  return maxDate;
}

export function padZero(time: number | null) {
  if (time == null) return '--';
  return time >= 10 ? '' + time : '0' + time;
}

export function getFormattedDay(date: Date) {
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}

export function getTimeForDisplay(date: Date) {
  return padZero(date.getHours()) + ':' + padZero(date.getMinutes());
}

export function getISOTime(hours: number, minutes: number) {
  return 'T' + padZero(hours) + ':' + padZero(minutes) + ':00.000Z';
}

// export function formatISODate(ISOTime:string){
//   const date = new Date(ISOTime);
// }
