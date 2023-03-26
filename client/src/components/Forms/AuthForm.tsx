import Link from 'next/link';
import { ReactNode } from 'react';
import Button from '../UI/Button/Button';

interface AuthFormProps {
  children: ReactNode;
  isLoginForm: boolean;
  classNames?: {
    form: string;
  };
  onSubmit: () => any;
}

export function AuthForm({
  children,
  isLoginForm,
  onSubmit,
  classNames
}: AuthFormProps) {
  const labels = {
    title: isLoginForm ? 'Авторизация' : 'Регистрация',
    submit: isLoginForm ? 'Войти' : 'Зарегистрироваться',
    redirectLink: isLoginForm ? '/auth/registration' : '/auth/login',
    redirectText: isLoginForm ? 'Нет аккаунта?' : 'Есть аккаунт?'
  };

  return (
    <div className='flex min-h-screen w-full items-center justify-center bg-c-grey'>
      <div
        className={`my-[3rem] rounded-common bg-white p-[2.08rem] ${classNames?.form}`}
      >
        <h2 className='mb-[2.08rem] text-center text-[1.8rem]'>
          {labels.title}
        </h2>
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
    </div>
  );
}
