import PropTypes from 'prop-types';

import {
  currencyToLocaleMapping,
  defaultCurrency,
} from '@/domain/Locale';

const CurrencySymbol = ({
  currency = defaultCurrency,
  className = '',
}) => {
  const locale = currencyToLocaleMapping[currency] || defaultCurrency;

  const symbol = (0).toLocaleString(
    locale,
    {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
  .replace(/\d/g, '')
  .trim();

  return (
    <span className={className}>{symbol}</span>
  );
};

CurrencySymbol.propTypes = {
  currency: PropTypes.string,
  className: PropTypes.string,
};

export default CurrencySymbol;
