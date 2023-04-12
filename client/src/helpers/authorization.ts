import { $authHost } from '@/http';
import { getCookie } from 'cookies-next';
import { GetServerSidePropsContext, PreviewData } from 'next';
import { ParsedUrlQuery } from 'querystring';

export function setAuthHeader(
  ctx?: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) {
  console.log(ctx?.req.cookies);
  $authHost.defaults.headers.Authorization = `Bearer ${getCookie('auth', {
    req: ctx?.req,
    res: ctx?.res
  })}`;
}
