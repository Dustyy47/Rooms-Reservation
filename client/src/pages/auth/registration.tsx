import { AuthForm } from '@/components/Forms/AuthForm';
import { Input } from '@/components/UI/Input/Input';
import { InputsGroup } from '@/components/UI/Input/InputsGroup';
import { RadioGroup, RadioVariant } from '@/components/UI/Radio/RadioGroup';
import { useCallback, useState } from 'react';

const radioVariants: RadioVariant[] = [
  {
    id: 1,
    name: 'Сотрудник'
  },
  {
    id: 2,
    name: 'Студент'
  }
];

export default function Login() {
  const [activeVariant, setActiveVariant] = useState<RadioVariant>(
    radioVariants[0]
  );

  const handleChangeStatus = useCallback((variantId: number) => {
    setActiveVariant(
      radioVariants.find((variant) => variant.id === variantId) ||
        radioVariants[0]
    );
  }, []);

  return (
    <AuthForm onSubmit={() => {}} isLoginForm={false}>
      <InputsGroup label='ФИО'>
        <Input placeholder='Введите фамилию' />
        <Input placeholder='Введите имя' />
        <Input placeholder='Введите отчество' />
      </InputsGroup>
      <InputsGroup label='Контактные данные'>
        <Input placeholder='Введите почту' />
        <Input placeholder='Введите телефон' />
      </InputsGroup>
      <InputsGroup label='Статус'>
        <RadioGroup
          checkedVariant={activeVariant}
          onChange={handleChangeStatus}
          group='status'
          variants={radioVariants}
        ></RadioGroup>
        <Input placeholder={activeVariant.name} />
      </InputsGroup>

      <InputsGroup label='Пароль'>
        <Input placeholder='Введите пароль' />
        <Input placeholder='Повторите пароль' />
      </InputsGroup>
    </AuthForm>
  );
}
