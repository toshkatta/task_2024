import { useState } from 'react';
import classNames from 'classnames';

import './styles.scss';

export const Input = (inputProps) => {
  const {
    name,
    label,
    errorMessage,
    inputMode,
    placeholder,
    value='',
    disabled = false,
    type = 'text',
    className = '',
    containerClassName = '',
    hasError = false,
    noAutoComplete = false,
    onFocus = () => null,
    onError = () => null,
    onBlur = () => null,
    onChange = () => null,
    children,
  } = inputProps;

  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e) => {
    setIsFocused(true);

    onFocus(e);

    if (hasError) onError();
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    onBlur(e);
  };

  const inputClasses = classNames({
    'input': true,
    'text-base': true,
    'text-black': true,
    'is-focused': isFocused,
    'has-error': hasError,
    [className]: !!className,
  });

  const containerClasses = classNames({
    'input-container': true,
    [containerClassName]: !!containerClassName,
  });

  const autoComplete = noAutoComplete ? 'off' : 'on';

  return (
    <section className={containerClasses}>
      {
        label &&
        <label className="input-label" htmlFor={name}>{label}</label>
      }
      <input
        type={type}
        name={name}
        inputMode={inputMode}
        placeholder={!isFocused ? placeholder : ''}
        className={inputClasses}
        autoComplete={autoComplete}
        disabled={disabled}
        value={value}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onChange={onChange}
      />
      {children}
      {
        hasError &&
        <span className="text-red text-xs">{errorMessage}</span>
      }
    </section>
  );
};
