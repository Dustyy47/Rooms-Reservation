import { InputHTMLAttributes } from 'react';

interface RadioButtonProps extends InputHTMLAttributes<HTMLInputElement> {}

export function RadioButton({ children, ...rest }: RadioButtonProps) {
  return (
    <div className='w-full'>
      <input
        className='peer pointer-events-none absolute opacity-0'
        type='radio'
        id={rest.id}
        {...rest}
      />
      <label
        htmlFor={rest.id}
        className='flex h-uiItem w-full cursor-pointer items-center justify-center rounded-common  bg-c-blue text-c-blue duration-[0ms] peer-checked:bg-c-blueAccent peer-checked:text-white peer-focus:shadow-outlineRadio'
      >
        {children}
      </label>
    </div>
  );
}
