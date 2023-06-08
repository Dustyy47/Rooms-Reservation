import { OrderInfo } from '@/components/Orders/OrderInfo';
import Button from '@/components/UI/Button/Button';
import { Container } from '@/components/UI/Container/Container';
import { Input } from '@/components/UI/Input/Input';
import { InputsGroup } from '@/components/UI/Input/InputsGroup';
import { RadioGroup } from '@/components/UI/Radio/RadioGroup';
import { useMakeOrder } from '@/hooks/useMakeOrder';
import { MakeOrderFormFields } from '@/types/Forms';
import { OrderMetaDetailed } from '@/types/Order';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  UserRadioVariant,
  radioVariants,
  validateSpecialField
} from '../auth/registration';

export default function MakeOrderForm() {
  const { details, makeOrder } = useMakeOrder();

  const {
    formState: { errors, isValid },
    register,
    getValues,
    handleSubmit,
    reset
  } = useForm<MakeOrderFormFields>({ mode: 'onTouched' });

  const handleChangeStatus = useCallback((variantId: number) => {
    reset({ specialField: '' });
    setActiveVariant(
      radioVariants.find((variant) => variant.id === variantId) ||
        radioVariants[0]
    );
  }, []);

  function handleMakeOrder() {
    makeOrder(getValues());
  }

  const [activeVariant, setActiveVariant] = useState<UserRadioVariant>(
    radioVariants[0]
  );

  if (!details.roomID) return null;

  return (
    <Container title='Бронирование. Анкета' links={null}>
      <div className='flex h-[35rem]'>
        <div className='mr-[5rem] flex w-[35%] flex-col justify-between'>
          <InputsGroup label='ФИО'>
            <Input
              {...register('surname', { required: true })}
              placeholder='Фамилия'
            />
            <Input
              {...register('name', { required: true })}
              placeholder='Имя'
            />
            <Input
              {...register('patronymic', { required: true })}
              placeholder='Отчество'
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

          <InputsGroup label='Контактные данные'>
            <Input
              {...register('phone', { required: true })}
              placeholder='Введите телефон'
            />
          </InputsGroup>
        </div>

        <div className='flex flex-col justify-between '>
          <OrderInfo orderMeta={details as OrderMetaDetailed}></OrderInfo>
          <div>
            <div className='float-right mb-[2rem] inline-block w-[50%]'>
              <Button
                onClick={handleSubmit(handleMakeOrder)}
                // disabled={!isValid}
              >
                Забронировать
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
