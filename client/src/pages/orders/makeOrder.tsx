import { OrderInfo } from '@/components/Orders/OrderInfo';
import Button from '@/components/UI/Button/Button';
import { Container } from '@/components/UI/Container/Container';
import { useMakeOrder } from '@/hooks/useMakeOrder';
import { MakeOrderFormFields } from '@/types/Forms';
import { OrderMetaDetailed } from '@/types/Order';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserRadioVariant, radioVariants } from '../auth/registration';

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
        <div className='flex flex-col justify-between '>
          <div className='mb-[2rem]'>
            <OrderInfo orderMeta={details as OrderMetaDetailed}></OrderInfo>
          </div>
          <div className='mt-[2rem] inline-block w-[1000%]'>
            <Button
              onClick={handleSubmit(handleMakeOrder)}
              // disabled={!isValid}
            >
              Забронировать
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
}
