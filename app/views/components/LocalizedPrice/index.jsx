import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import {
  currencyToLocaleMapping,
  defaultCurrency,
} from '@/domain/Locale';

import { selectRateSymbolById } from '@/store/rates/selectors';

const LocalizedPrice = ({
  price,
  currency = defaultCurrency,
  compact = false,
  className = '',
  symbolClassname = '',
}) => {
  const symbol = useSelector(selectRateSymbolById(currency));

  const locale = currencyToLocaleMapping[currency] || defaultCurrency;
  const localized = compact
    ? price.toLocaleString(locale, { notation: 'compact', maximumFractionDigits: 1 })
    : price.toLocaleString(locale, { maximumFractionDigits: 2 });

  return (
    <strong className={className}>
      { symbol && <span className={symbolClassname}>{symbol}</span> }
      <span>{localized}</span>
      { !symbol && <span className={symbolClassname}>&nbsp;{currency.toUpperCase()}</span> }
    </strong>
  );
};

LocalizedPrice.propTypes = {
  price: PropTypes.number.isRequired,
  currency: PropTypes.string,
  compact: PropTypes.bool,
  className: PropTypes.string,
  symbolClassname: PropTypes.string,
};

export default LocalizedPrice;
