import Link from 'next/link';
import { HTMLAttributes, ReactNode } from 'react';
import Button from '../UI/Button/Button';

interface AuthFormProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  isLoginForm: boolean;
  onSubmit: () => any;
}

export function AuthForm({
  children,
  isLoginForm,
  onSubmit,
  ...rest
}: AuthFormProps) {
  const labels = {
    title: isLoginForm ? 'Авторизация' : 'Регистрация',
    submit: isLoginForm ? 'Войти' : 'Зарегистрироваться',
    redirectLink: isLoginForm ? '/auth/registration' : '/auth/login',
    redirectText: isLoginForm ? 'Нет аккаунта?' : 'Есть аккаунт?'
  };

  return (
    <div {...rest} className={`rounded-common p-[2.08rem] shadow-md`}>
      <h2 className='mb-[2.08rem] text-center text-[1.8rem]'>{labels.title}</h2>
      <div>{children}</div>
      <Button onClick={onSubmit} className='mb-[1.04rem] w-full'>
        {labels.submit}
      </Button>
      <div className='text-center'>
        <Link
          className=' border-b-[0.04rem] border-b-transparent  text-[0.9rem] text-c-blue duration-100 hover:border-b-c-blue'
          href={labels.redirectLink}
        >
          {labels.redirectText}
        </Link>
      </div>
    </div>
  );
}
