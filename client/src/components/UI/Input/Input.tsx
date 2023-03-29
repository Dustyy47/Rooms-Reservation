import { forwardRef, InputHTMLAttributes } from 'react';

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'ref'> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (props: InputProps, ref) => {
    return (
      <input
        {...props}
        ref={ref}
        className={` h-uiItem w-full rounded-common bg-c-grey px-[1.25rem] py-[1rem] text-c-black shadow-outlineHidden outline-none placeholder:text-c-grey focus:shadow-outline ${props.className}`}
      />
    );
  }
);
