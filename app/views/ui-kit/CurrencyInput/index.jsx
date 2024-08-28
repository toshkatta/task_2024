import { useEffect, useState } from 'react';

import { isNumeric } from 'infrastructure/validation/isNumeric';

import { Input } from '../Input';

const isBase10 = (value) => value.substr(0, 2) !== '0x' && value.substr(0, 2) !== '0o';

const format = (value) => {
  if (
    !isNumeric(value) ||
    !value.trim().length ||
    !isBase10(value)
  ) {
    return '';
  }

  return `${parseFloat(value).toLocaleString('en-US', {
    maximumFractionDigits: 2,
  })}`;
};

export const CurrencyInput = (currencyInputProps) => {
  const [formattedValue, setFormattedValue] = useState(currencyInputProps.value);

  const onBlur = (event) => {
    const { value } = event.target;

    if (!value.includes(currencyInputProps.currency)) {
      const formatted = format(value);

      if (formatted) setFormattedValue(formatted);
    }

    if (typeof currencyInputProps.onBlur === 'function') currencyInputProps.onBlur(event);
  };

  const onChange = (e) => {
    currencyInputProps.onChange(parseFloat(e.target.value));
  }

  useEffect(() => {
    const { value } = currencyInputProps;

    if (!value) return setFormattedValue('');
    if (!isNumeric(value)) return setFormattedValue(value);

    setFormattedValue(value);
  }, [currencyInputProps.value]);

  useEffect(() => {
    const { value } = currencyInputProps;
    const formatted = format(value);

    if (formatted) setFormattedValue(formatted);
  }, []);

  return (
    <Input
      {...currencyInputProps}
      type="text"
      inputMode="numeric"
      noAutoComplete
      onBlur={onBlur}
      value={formattedValue}
      onChange={onChange}
    />
  );
};
