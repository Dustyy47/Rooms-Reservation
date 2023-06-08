import {
  UserRadioVariant,
  radioVariants,
  validateSpecialField
} from '@/pages/auth/registration';
import { MakeOrderFormFields } from '@/types/Forms';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { RoomData } from '../../types/Room';
import { RoomImage } from '../RoomImage/RoomImage';
import { LocationIcon } from '../SVG/Location';
import Button from '../UI/Button/Button';
import { Input } from '../UI/Input/Input';
import { InputsGroup } from '../UI/Input/InputsGroup';
import { RadioGroup } from '../UI/Radio/RadioGroup';

interface MakeOrderFormProps {
  room: Pick<RoomData, 'title' | 'image'>;
}
export function MakeOrderForm({ room }: MakeOrderFormProps) {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    watch,
    reset
  } = useForm<MakeOrderFormFields>({ mode: 'onTouched' });

  const [activeVariant, setActiveVariant] = useState<UserRadioVariant>(
    radioVariants[0]
  );

  const handleChangeStatus = useCallback((variantId: number) => {
    reset({ specialField: '' });
    setActiveVariant(
      radioVariants.find((variant) => variant.id === variantId) ||
        radioVariants[0]
    );
  }, []);

  return (
    <form>
      <div>
        <h2>Бронирование. Анкета</h2>
        <InputsGroup label='ФИО'>
          <Input
            {...register('surname', { required: true })}
            placeholder='Введите фамилию'
          />
          <Input
            {...register('name', { required: true })}
            placeholder='Введите имя'
          />
          <Input
            {...register('patronymic', { required: true })}
            placeholder='Введите отчество'
          />
        </InputsGroup>
        <InputsGroup label='Статус'>
          <RadioGroup
            checkedVariant={activeVariant}
            onChange={handleChangeStatus}
            group='status'
            variants={radioVariants}
          ></RadioGroup>
          <Input
            {...register('specialField', {
              required: true,
              validate: (val) => validateSpecialField(val, activeVariant.type)
            })}
            placeholder={activeVariant.name}
          />
        </InputsGroup>
        <InputsGroup label='Контактный номер'>
          <Input
            {...register('phone', { required: true })}
            placeholder='Введите телефон'
          />
        </InputsGroup>
      </div>

      <div>
        <div>
          <LocationIcon />
          <h2>Зеркальный зал</h2>
          <RoomImage image={room.image} />
        </div>
        <div className='w-[12.5rem]'>
          <Button>Забронировать</Button>
        </div>
      </div>
    </form>
  );
}
