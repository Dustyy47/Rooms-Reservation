interface CalendarDateProps {
  date: Date | null;
  type: 'base' | 'active' | 'disabled';
  onClick: (date: Date) => any;
}

export function CalendarDate({
  date,
  type = 'base',
  onClick
}: CalendarDateProps) {
  if (!date) return <div className='w-full'></div>;

  const cn =
    type === 'base'
      ? 'bg-c-blueGrey hover:bg-c-blueAccent hover:text-white'
      : type === 'active'
      ? 'bg-c-blueAccent text-white'
      : type === 'disabled'
      ? 'text-c-greyLight bg-c-blueGrey pointer-events-none'
      : '';

  return (
    <div
      onClick={() => onClick(date)}
      className={
        'flex aspect-square cursor-pointer items-center justify-center rounded-full ' +
        cn
      }
    >
      {date?.getDate()}
    </div>
  );
}
