import { HTMLAttributes, ReactNode } from 'react';

interface InputsGroupProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  children: ReactNode;
}

export function InputsGroup({ label, children, ...rest }: InputsGroupProps) {
  return (
    <div className={`mb-[2.08rem] flex flex-col ${rest.className}`}>
      <h3 className='mb-[0.41rem]'>{label}</h3>
      <div className='flex flex-col [&>*+*]:mt-[0.41rem]'>{children}</div>
    </div>
  );
}
