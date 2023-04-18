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
