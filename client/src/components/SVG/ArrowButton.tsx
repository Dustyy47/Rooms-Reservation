interface ArrowButtonProps {
  direction?: 'right' | 'left';
  onClick: () => any;
}

export function ArrowButton({ onClick, direction }: ArrowButtonProps) {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer ${direction === 'left' ? 'rotate-180' : ''}`}
    >
      <svg className='scale-[1.5]' width={30} height={35}>
        <path d='M 14,12 l 5,5 l -5,5'></path>
      </svg>
    </div>
  );
}
