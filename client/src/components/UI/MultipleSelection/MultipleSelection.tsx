import { Selection } from '../Selection/Selection';

interface MultipleSelectionProps {
  label: string;
  groups: Selection[];
}

export function MultipleSelection({ label, groups }: MultipleSelectionProps) {
  return (
    <div>
      <p className='mb-[0.41rem] text-c-grey'>{label}</p>
      <div className='flex h-[3.33rem] w-[15rem] items-center justify-around rounded-common bg-c-grey'>
        {groups.slice(0, -1).map((group) => (
          <>
            <Selection key={group.name} selection={group}></Selection>
            <svg
              width='2'
              height='20'
              viewBox='0 0 2 38'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M1 1V37'
                stroke='#ADB5BD'
                stroke-width='2'
                stroke-linecap='round'
              />
            </svg>
          </>
        ))}
        <Selection selection={groups.at(-1)!}></Selection>
      </div>
    </div>
  );
}
