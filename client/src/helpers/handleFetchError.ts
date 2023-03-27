import { AxiosError } from 'axios';
export function handleFetchError(e: unknown) {
  const error = e as AxiosError;
  console.log(error.message);
  throw new Error(error.message);
}
