import type { AppProps } from 'next/app';

import { NavBar } from '@/components/NavBar/NavBar';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className='flex'>
      <NavBar />
      <Component {...pageProps} />
    </div>
  );
}
