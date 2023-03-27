import { AuthForm } from '@/components/Forms/AuthForm';
import { Input } from '@/components/UI/Input/Input';
import { InputsGroup } from '@/components/UI/Input/InputsGroup';
import { RadioGroup, RadioVariant } from '@/components/UI/Radio/RadioGroup';
import { useForm } from '@/hooks/useForm';
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
  const { change, isCorrect } = useForm([
    'surname',
    'name',
    'patronymic',
    'email',
    'phone',
    'specialField',
    'password',
    'passwordConfirm'
  ]);

  const handleChangeStatus = useCallback((variantId: number) => {
    setActiveVariant(
      radioVariants.find((variant) => variant.id === variantId) ||
        radioVariants[0]
    );
  }, []);

  return (
    <AuthForm
      isCorrect={isCorrect()}
      classNames={{ form: 'w-[22%]' }}
      onSubmit={() => {}}
      isLoginForm={false}
    >
      <InputsGroup label='ФИО'>
        <Input
          onChange={(v) => change('surname', v)}
          placeholder='Введите фамилию'
        />
        <Input onChange={(v) => change('name', v)} placeholder='Введите имя' />
        <Input
          onChange={(v) => change('patronymic', v)}
          placeholder='Введите отчество'
        />
      </InputsGroup>
      <InputsGroup label='Контактные данные'>
        <Input
          onChange={(v) => change('email', v)}
          placeholder='Введите почту'
        />
        <Input
          onChange={(v) => change('phone', v)}
          placeholder='Введите телефон'
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
          onChange={(v) => change('specialField', v)}
          placeholder={activeVariant.name}
        />
      </InputsGroup>

      <InputsGroup label='Пароль'>
        <Input
          onChange={(v) => change('password', v)}
          placeholder='Введите пароль'
        />
        <Input
          onChange={(v) => change('passwordConfirm', v)}
          placeholder='Повторите пароль'
        />
      </InputsGroup>
    </AuthForm>
  );
}
