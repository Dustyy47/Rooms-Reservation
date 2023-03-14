import { RoomData } from '@/models/Room';
import Image from 'next/image';
import { LocationIcon } from '../SVG/Location';

interface RoomProps {
  room: RoomData;
  className?: string;
}

export function Room({ room, className }: RoomProps) {
  const { imageHref, name, adress, description } = room;
  return (
    <div
      className={`flex justify-between tablet:flex-col-reverse ${className}`}
    >
      <Image
        width={300}
        height={300}
        className='mr-[2.08rem] min-h-[16rem] w-full max-w-[25rem] rounded-common bg-c-blue '
        src={imageHref}
        alt=''
      />
      <div className='flex w-[20.8rem] flex-col tablet:w-[25rem]'>
        <h2 className='mb-[1.25rem] bg-c-grey py-[0.7rem] px-[1.25rem]'>
          {name}
        </h2>
        <div className='flex'>
          <p className='mb-[0.83rem] mr-[0.2rem] font-bold'>{adress}</p>
          <LocationIcon />
        </div>
        <p>{description}</p>
      </div>
    </div>
  );
}
