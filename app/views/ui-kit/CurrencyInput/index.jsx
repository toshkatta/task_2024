import { useState } from 'react';

import { isNumeric } from '@/infrastructure/validation/isNumeric';

import { Input } from '../Input';

const isBase10 = (value) => value.substr(0, 2) !== '0x' && value.substr(0, 2) !== '0o';

const validate = (value) => {
  if (
    !isNumeric(value) ||
    !value?.trim().length ||
    !isBase10(value)
  ) {
    return '';
  }

  return value;
};

export const CurrencyInput = (currencyInputProps) => {
  const [validValue, setValidValue] = useState(currencyInputProps.value);

  const onBlur = (event) => {
    const { value } = event.target;

    const valid = validate(value);
    if (valid === '') return;

    const valueToFixed = parseFloat(valid).toFixed(2);
    setValidValue(valueToFixed === '0.00' ? '' : valueToFixed);

    if (typeof currencyInputProps.onBlur === 'function') currencyInputProps.onBlur(event);
  };

  const onChange = (event) => {
    const { value } = event.target;

    if (value === '') return setValidValue('');

    const valid = validate(value);
    if (valid === '') return;

    currencyInputProps.onChange(parseFloat(value));
    setValidValue(valid);
  }

  return (
    <Input
      {...currencyInputProps}
      type="text"
      inputMode="numeric"
      noAutoComplete
      onBlur={onBlur}
      value={validValue}
      onChange={onChange}
    />
  );
};
