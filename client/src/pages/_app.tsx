import { NavBar } from '@/components/NavBar/NavBar';
import { $authHost } from '@/http';
import { wrapper } from '@/store';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { usersActions } from '@/store/slices/userSlice';
import '@/styles/globals.css';
import { Status } from '@/types/HTTP';
import { getCookie } from 'cookies-next';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Provider } from 'react-redux';

export default function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;
  return (
    <Provider store={store}>
      <AuthContainer Component={Component} pageProps={pageProps} />
    </Provider>
  );
}

const localRoutes = ['/auth/login', 'auth/registration'];

export function AuthContainer({
  Component,
  pageProps
}: Pick<AppProps, 'Component'> & { pageProps: any }) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user, loadingUser } = useAppSelector((state) => state.user);

  useEffect(() => {
    $authHost.defaults.headers.Authorization = `Bearer ${getCookie('auth')}`;
    dispatch(usersActions.fetchUser());
  }, []);

  if (loadingUser === Status.pending) return null;

  if (
    (loadingUser === Status.rejected || !user) &&
    !localRoutes.includes(router.pathname.split('?')[0])
  ) {
    router.push('auth/login');
  }

  return (
    <div className='flex'>
      {<NavBar />}
      <Component {...pageProps} />
    </div>
  );
}
