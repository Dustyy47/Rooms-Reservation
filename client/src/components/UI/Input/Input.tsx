import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input: React.FC<InputProps> = ({ ...inputProps }) => {
  return (
    <input
      {...inputProps}
      className={` h-uiItem w-[16.5rem] rounded-common bg-c-grey px-[1.25rem] py-[1rem] text-c-black shadow-outlineHidden outline-none placeholder:text-c-grey focus:shadow-outline ${inputProps.className}`}
    />
  );
};
