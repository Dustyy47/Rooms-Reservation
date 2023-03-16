import { useOutsideClick } from '@/hooks/useOutsideClick';
import { useRef, useState } from 'react';

export interface Selection {
  name: string;
  data: string[];
}

interface SelectionProps {
  selection: Selection;
}

export function Selection({ selection }: SelectionProps) {
  const { name, data } = selection;
  const [isOpen, setOpen] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);

  useOutsideClick(listRef, () => setOpen(false), [spanRef]);

  function toggle() {
    setOpen(!isOpen);
  }

  return (
    <div className='relative'>
      <span
        ref={spanRef}
        onClick={toggle}
        className={`cursor-pointer  ${isOpen ? 'text-c-black' : 'text-c-grey'}`}
      >
        {name}
      </span>
      <ul
        ref={listRef}
        className={`${
          !isOpen ? 'pointer-events-none  bottom-[-5%] opacity-0' : ''
        } absolute left-[50%] bottom-[200%] flex max-h-[16.6rem] w-[7.08rem] origin-bottom  translate-x-[-50%] flex-col-reverse items-center overflow-auto rounded-common bg-c-grey p-[0.83rem]`}
      >
        {data.map((item) => (
          <li
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
