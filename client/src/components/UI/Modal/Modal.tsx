interface ModalProps {
  isActive: boolean;
  setActive: (value: boolean) => any;
  children: React.ReactElement;
}

export function Modal({ isActive, setActive, children }: ModalProps) {
  function handleOutsideClick() {
    console.log('click');
    setActive(false);
  }

  const cn = !isActive ? 'pointer-events-none opacity-0' : '';

  return (
    <div
      onClick={handleOutsideClick}
      className={`${cn} absolute left-0 top-0 z-[100] flex h-screen w-screen items-center justify-center bg-[rgba(0,0,0,0.50)] duration-300 `}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className='h-[70%] w-[50%] rounded-common bg-white'
      >
        {children}
      </div>
    </div>
  );
}
