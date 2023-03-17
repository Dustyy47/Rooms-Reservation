import { useOutsideClick } from '@/hooks/useOutsideClick';
import { useRef, useState } from 'react';

// interface ServerResponse{
//   years: [
//     {
//       name:string,
//       months: [
//         {
//           name: string
//           days: [
//             {
//               name:string
//               hours: [
//                 {
//                   start: {
//                     hours: 11,
//                     minutes: 0
//                   },
//                   end: {
//                     hours: 15,
//                     minutes: 25
//                   },
//                 },
//                 {
//                   start: '16',
//                   end: '19'
//                 }

//               ]
//             }
//           ]
//         }
//       ]
//     }
//   ]
// }

export interface Selection {
  name: string;
  data: string[];
  placeholder: string;
  disabled: boolean;
  keyName: string;
}

interface SelectionProps {
  selection: Selection;
  onPick: (data: string, keyName: string) => any;
  className?: string;
}

export function Selection({ selection, onPick, className }: SelectionProps) {
  const { data, name, placeholder, disabled, keyName } = selection;
  const [isOpen, setOpen] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);

  useOutsideClick(listRef, () => setOpen(false), [spanRef]);

  function pickItem(item: string) {
    onPick(item, keyName);
    setOpen(!isOpen);
  }

  function toggle() {
    setOpen(!isOpen);
  }

  return (
    <div className={`relative ${className}`}>
      <span
        ref={spanRef}
        onClick={toggle}
        className={`cursor-pointer  ${
          !disabled ? 'text-c-black' : 'pointer-events-none text-c-grey'
        }`}
      >
        {name ? name : placeholder}
      </span>
      <ul
        ref={listRef}
        className={`${
          !isOpen ? 'pointer-events-none  bottom-[-5%] opacity-0' : ''
        } absolute left-[50%] bottom-[200%] flex max-h-[16.6rem] w-[7.08rem] origin-bottom  translate-x-[-50%] flex-col-reverse items-center overflow-auto rounded-common bg-c-grey p-[0.83rem]`}
      >
        {data?.map((item) => (
          <li
            onClick={() => pickItem(item)}
            key={item}
            className='flex min-h-[2.25rem] w-full cursor-pointer items-center justify-center rounded-common border-b-c-greyUltraLight hover:bg-c-blueGrey [&+&]:border-b-[2px]'
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
