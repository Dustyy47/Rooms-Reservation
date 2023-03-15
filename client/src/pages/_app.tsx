import type { AppProps } from 'next/app';

import { NavBar } from '@/components/NavBar/NavBar';
import { wrapper } from '@/store';
import '@/styles/globals.css';
import { Provider } from 'react-redux';

export default function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;
  return (
    <Provider store={store}>
      <div className='flex'>
        <NavBar />
        <Component {...pageProps} />
      </div>
    </Provider>
  );
}
