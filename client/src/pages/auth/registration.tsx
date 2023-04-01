import { AuthForm } from '@/components/Forms/AuthForm';
import { Input } from '@/components/UI/Input/Input';
import { InputsGroup } from '@/components/UI/Input/InputsGroup';
import { RadioGroup, RadioVariant } from '@/components/UI/Radio/RadioGroup';
import { isAnyFieldEmpty } from '@/helpers/formHelpers';
import { useAuthorize } from '@/hooks/api/useAuthorize';
import { RegistrationFormFields } from '@/types/Forms';
import { UserType, isCourse } from '@/types/User';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

type UserRadioVariant = RadioVariant & { type: UserType };

const radioVariants: UserRadioVariant[] = [
  {
    id: 1,
    name: 'Сотрудник',
    type: UserType.Teacher
  },
  {
    id: 2,
    name: 'Студент',
    type: UserType.Student
  }
];

function validateSpecialField(value: string, type: UserType): boolean {
  switch (type) {
    case UserType.Student:
      return isCourse(value);
    case UserType.Teacher:
      return true;
  }
}

export default function Registration() {
  const [activeVariant, setActiveVariant] = useState<UserRadioVariant>(
    radioVariants[0]
  );

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    watch,
    reset
  } = useForm<RegistrationFormFields>({ mode: 'onTouched' });

  const handleChangeStatus = useCallback((variantId: number) => {
    reset({ specialField: '' });
    setActiveVariant(
      radioVariants.find((variant) => variant.id === variantId) ||
        radioVariants[0]
    );
  }, []);

  const { submitRegister: submit, error: APIError } = useAuthorize();

  const renderFormErrors = () => (
    <>
      {errors.passwordConfirm?.type == 'validate' && 'Пароли не совпадают'}
      {isAnyFieldEmpty<RegistrationFormFields>(errors) &&
        'Все поля должны быть заполнены!'}
      {APIError}
    </>
  );

  return (
    <AuthForm
      isValid={isValid}
      classNames={{ form: 'w-[22%]' }}
      onSubmit={handleSubmit(submit)}
      isLoginForm={false}
      errorsFallback={renderFormErrors()}
    >
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
      <InputsGroup label='Контактные данные'>
        <Input
          {...register('email', { required: true })}
          placeholder='Введите почту'
        />
        <Input
          {...register('phone', { required: true })}
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
          {...register('specialField', {
            required: true,
            validate: (val) => validateSpecialField(val, activeVariant.type)
          })}
          placeholder={activeVariant.name}
        />
      </InputsGroup>

      <InputsGroup label='Пароль'>
        <Input
          {...register('password', {
            required: true
          })}
          type='password'
          placeholder='Введите пароль'
        />
        <Input
          {...register('passwordConfirm', {
            required: true,
            validate: (val) => watch('password') === val
          })}
          type='password'
          placeholder='Повторите пароль'
        />
      </InputsGroup>
    </AuthForm>
  );
}
