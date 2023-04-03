import { getAPIImageSrc } from '@/helpers/APIImageSrc';
import { RoomData } from '@/types/Room';
import Image from 'next/image';
import { LocationIcon } from '../SVG/Location';

interface RoomProps {
  room: RoomData;
  className?: string;
}

export function RoomPreview({ room, className }: RoomProps) {
  const { image, title, adress, description } = room;
  return (
    <div
      className={`flex max-w-[48.9rem] justify-between tablet:flex-col-reverse ${className}`}
    >
      <Image
        width={300}
        height={300}
        className='mr-[2.08rem] min-h-[17rem] w-full max-w-[25rem] rounded-common bg-c-blue '
        src={getAPIImageSrc(image, 'rooms')}
        alt=''
      />
      <div className='flex w-[20.8rem] flex-col tablet:w-[25rem]'>
        <h2 className='mb-[1.25rem] bg-c-grey py-[0.7rem] px-[1.25rem]'>
          {title}
        </h2>
        <div className='mb-[0.83rem] flex'>
          <div className=' mr-[0.2rem]'>
            <LocationIcon />
          </div>
          <p className='font-bold'>{adress}</p>
        </div>
        <p>{description}</p>
      </div>
    </div>
  );
}
