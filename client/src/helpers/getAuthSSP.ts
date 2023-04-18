import { RootStore, wrapper } from '@/store';
import { GetServerSidePropsCallback } from 'next-redux-wrapper';
import { setAuthHeader } from './authorization';

export function getAuthSSP(cb: GetServerSidePropsCallback<RootStore, {}>) {
  return wrapper.getServerSideProps((store) => async (ctx) => {
    setAuthHeader(ctx);
    const ctxCb = await cb(store);
    const result = await ctxCb(ctx);
    return { ...result };
  });
}
