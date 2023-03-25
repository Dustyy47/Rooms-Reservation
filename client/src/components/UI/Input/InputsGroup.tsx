import { ReactNode } from 'react';

interface InputsGroupProps {
  label: string;
  children: ReactNode;
}

export function InputsGroup({ label, children }: InputsGroupProps) {
  return (
    <div className='mb-[2.08rem] flex flex-col'>
      <h3 className='mb-[0.41rem]'>{label}</h3>
      {children}
    </div>
  );
}
