import React, { InputHTMLAttributes } from 'react';

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onChange: (value: string) => any;
}

export const Input: React.FC<InputProps> = ({ onChange, ...inputProps }) => {
  return (
    <input
      {...inputProps}
      onChange={(e) => onChange(e.target.value)}
      className={` h-uiItem w-full rounded-common bg-c-grey px-[1.25rem] py-[1rem] text-c-black shadow-outlineHidden outline-none placeholder:text-c-grey focus:shadow-outline ${inputProps.className}`}
    />
  );
};
