import { FieldErrors, FieldValues } from 'react-hook-form';
export function isAnyFieldEmpty<T extends FieldValues>(fields: FieldErrors<T>) {
  for (let key in fields) {
    if (fields[key]?.type === 'required') return true;
  }
  return false;
}
