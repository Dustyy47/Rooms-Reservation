import { useOutsideClick } from '@/hooks/useOutsideClick';
import { useRef, useState } from 'react';

export type SelectionDataType = string | number;
export interface Selection {
  name: string;
  data: SelectionDataType[];
  placeholder: string;
  disabled?: boolean;
  keyName: string;
}

interface SelectionProps {
  selection: Selection;
  onPick: (data: SelectionDataType, keyName: string) => any;
  className?: string;
}

export function Selection({ selection, onPick, className }: SelectionProps) {
  const { data, name, placeholder, disabled, keyName } = selection;
  const [isOpen, setOpen] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);

  useOutsideClick(listRef, () => setOpen(false), [spanRef]);

  function pickItem(item: SelectionDataType) {
    onPick(item, keyName);
    setOpen(!isOpen);
  }

  function toggle() {
    setOpen(!isOpen);
  }

  return (
    <div
      className={`relative flex w-[100%] justify-center [&+&]:border-l-[2px] [&+&]:border-l-c-greyLight ${className}`}
    >
      <span
        onClick={toggle}
        ref={spanRef}
        className={`w-full cursor-pointer text-center  ${
          !disabled ? 'text-c-black' : 'pointer-events-none text-c-grey'
        }`}
      >
        {name ? name : placeholder}
      </span>
      <ul
        ref={listRef}
        className={`${
          !isOpen ? 'pointer-events-none  bottom-[-5%] opacity-0' : 'z-10'
        } absolute left-[50%] top-[200%] flex max-h-[16.6rem] w-[7.08rem] origin-bottom  translate-x-[-50%] flex-col items-center overflow-auto rounded-common bg-c-grey p-[0.83rem]`}
      >
        {data?.map((item) => (
          <li
            onClick={() => pickItem(item)}
            key={item}
            className='flex min-h-[2.25rem] w-full cursor-pointer items-center justify-center rounded-common border-t-c-greyUltraLight hover:bg-c-blueGrey [&+&]:border-t-[2px]'
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
