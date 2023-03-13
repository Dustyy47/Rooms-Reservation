interface ContainerProps {
  title: string;
  children: React.ReactNode;
}

export function Container({ title, children }: ContainerProps) {
  return (
    <div className='h-screen w-full overflow-auto p-[2.08rem]'>
      <h1 className='mb-[0.8rem]'>{title}</h1>
      {children}
    </div>
  );
}
