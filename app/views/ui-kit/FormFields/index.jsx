import { useEffect } from 'react';
import { useField, useFormikContext } from 'formik';

import { Input } from '../Input';

export const CurrencyInputField = ({ ...props }) => {
  const [field, meta] = useField(props);
  const { errors } = useFormikContext();

  const errorKeys = Object.keys(errors);
  const lastErrorField = errorKeys.pop();

  const touched = !!meta.touched;
  const hasError = !!meta.touched && !!meta.error;
  const errorMessage = field.name === lastErrorField ? meta.error : undefined;

  return (
    <Input
      touched={touched}
      hasError={hasError}
      errorMessage={errorMessage}
      {...field}
      {...props}
      type="text"
      inputMode="numeric"
      noAutoComplete
    />
  );
};

export const ErrorFocus = () => {
  const { isSubmitting, isValidating, errors, values } = useFormikContext();

  useEffect(() => {
    const keys = Object.keys(errors);

    if (keys.length > 0 && isSubmitting && !isValidating) {
      const errorName = Object.keys(values).find((value) => keys.includes(value));

      if (errorName) {
        const selector = `[name="${errorName}"]`;
        const errorElement = document.querySelector(selector);
        if (errorElement && errorElement.focus) {
          errorElement.focus();
        }
      }
    }
  }, [isSubmitting, isValidating, errors]);

  return null;
};
