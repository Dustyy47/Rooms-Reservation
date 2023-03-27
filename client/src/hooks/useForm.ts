import { useState } from 'react';

function initFields(fieldsNames: string[]) {
  return fieldsNames.reduce((accum: Record<string, string>, fieldName) => {
    accum[fieldName] = '';
    return accum;
  }, {});
}

export function useForm(fieldsNames: string[]) {
  const [fields, setFields] = useState(initFields(fieldsNames));

  return {
    change(name: keyof typeof fields, value: string) {
      setFields((prev) => ({ ...prev, [name]: value }));
    },
    isCorrect() {
      for (let v in fields) {
        console.log('@', v, fields);
        if (!fields[v]) return false;
      }
      return true;
    },
    fields,
    setFields
  };
}
