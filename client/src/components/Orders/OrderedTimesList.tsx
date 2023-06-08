import { padZero } from '@/helpers/timeHelpers';
import { OrderTime } from '@/types/Order';

interface OrderedTimesList {
  orderedTimes: OrderTime[];
}

function getTimeFromDateString(dateString: string) {
  const date = new Date(dateString);
  return padZero(date.getHours()) + ':' + padZero(date.getMinutes());
}
export function OrderedTimesList({ orderedTimes }: OrderedTimesList) {
  function renderTime() {
    return (
      <ul>
        {orderedTimes.map((time, index) => {
          const formattedTime = {
            start: getTimeFromDateString(time.start),
            end: getTimeFromDateString(time.end)
          };
          return (
            <li key={index}>
              <span>
                {formattedTime.start} - {formattedTime.end}
              </span>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <div className='w-[20%]'>
      <h2>Занятое время:</h2>
      {orderedTimes?.length > 0 ? (
        renderTime()
      ) : (
        <span className='text-c-grey'>
          Помещение никем не забронировано на этот день
        </span>
      )}
    </div>
  );
}
