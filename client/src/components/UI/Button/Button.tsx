import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      {...props}
      className={`h-uiItem w-full rounded-common bg-c-blueAccent text-white hover:bg-c-blue hover:text-c-blue disabled:bg-c-grey disabled:text-c-black ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
