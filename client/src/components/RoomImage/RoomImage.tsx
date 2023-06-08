import { getAPIImageSrc } from '@/helpers/APIImageSrc';
import Image from 'next/image';

interface RoomImageProps {
  image: string;
}

export function RoomImage({ image }: RoomImageProps) {
  return (
    <Image
      width={450}
      height={300}
      className='min-h-[17rem] w-full max-w-[25rem] rounded-common bg-c-blue '
      src={getAPIImageSrc(image)}
      alt=''
    />
  );
}
