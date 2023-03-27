import { RadioButton } from './RadioButton';

export interface RadioVariant {
  id: number;
  name: string;
}

interface RadioGroupProps {
  group: string;
  variants: RadioVariant[];
  checkedVariant: RadioVariant;
  onChange: (variantId: number) => any;
}

export function RadioGroup({
  group,
  variants,
  checkedVariant,
  onChange
}: RadioGroupProps) {
  return (
    <div className='flex w-full justify-between'>
      {variants.map((variant) => (
        <div className='w-[48%]'>
          <RadioButton
            key={group + variant.id}
            name={group}
            id={group + variant.id}
            checked={checkedVariant.id === variant.id}
            onChange={() => onChange(variant.id)}
          >
            {variant.name}
          </RadioButton>
        </div>
      ))}
    </div>
  );
}
