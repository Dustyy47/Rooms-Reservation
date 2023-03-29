import { AxiosError } from 'axios';
import { ApiError } from 'next/dist/server/api-utils';
export function handleFetchError(e: unknown) {
  const error = e as AxiosError<ApiError>;
  throw new Error(error.response?.data.message);
}
