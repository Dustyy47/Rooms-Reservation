import { Selection } from '../Selection/Selection';

interface MultipleSelectionProps {
  label: string;
  groups: Selection[];
  onPick: (item: string, keyName: string) => any;
}

export function MultipleSelection({
  label,
  groups,
  onPick
}: MultipleSelectionProps) {
  return (
    <div>
      <p className='mb-[0.41rem] text-c-grey'>{label}</p>
      <div className='flex h-[3.33rem] w-[15rem] items-center  rounded-common bg-c-grey'>
        {groups.map((group, index) => (
          <>
            <Selection
              key={group.keyName}
              selection={group}
              onPick={(item, keyName) => onPick(item, keyName)}
              className={`flex w-[100%] justify-center [&+&]:border-l-[2px] [&+&]:border-l-c-greyLight`}
            ></Selection>
          </>
        ))}
      </div>
    </div>
  );
}
