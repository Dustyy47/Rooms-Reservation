import { AxiosError } from 'axios';
import { ApiError } from 'next/dist/server/api-utils';
export function handleFetchError(e: unknown) {
  const error = e as AxiosError<ApiError>;
  console.log(error);
  throw new Error(error.response?.data.message);
}
