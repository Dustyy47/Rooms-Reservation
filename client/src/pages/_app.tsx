import { NavBar } from '@/components/NavBar/NavBar';
import { setAuthHeader } from '@/helpers/authorization';
import { wrapper } from '@/store';
import { useAppDispatch } from '@/store/hooks';
import { usersActions } from '@/store/slices/userSlice';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
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

export const authRoutes = ['/auth/login', '/auth/registration'];

export function AuthContainer({
  Component,
  pageProps
}: Pick<AppProps, 'Component'> & { pageProps: any }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    setAuthHeader();
    dispatch(usersActions.fetchUser());
  }, []);

  return (
    <div className='flex'>
      {<NavBar />}
      <Component {...pageProps} />
    </div>
  );
}
