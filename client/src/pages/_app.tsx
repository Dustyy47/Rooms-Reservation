import { NavBar } from '@/components/NavBar/NavBar';
import { useAuth } from '@/hooks/useAuth';
import { wrapper } from '@/store';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

export default function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;
  return (
    <Provider store={store}>
      <AppWithRedux Component={Component} pageProps={pageProps} />
    </Provider>
  );
}

export function AppWithRedux({
  Component,
  pageProps
}: Pick<AppProps, 'Component'> & { pageProps: any }) {
  const { isAuth } = useAuth();

  return (
    <div className='flex'>
      {isAuth && <NavBar />}
      <Component {...pageProps} />
    </div>
  );
}
