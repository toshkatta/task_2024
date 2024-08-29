import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  currencyToLocaleMapping,
  defaultCurrency,
} from 'domain/Locale';

import CurrencySymbol from 'components/CurrencySymbol';

import './styles.scss';

const LocalizedPrice = ({
  price,
  currency = defaultCurrency,
  className = '',
  symbolClassname = '',
}) => {
  const locale = currencyToLocaleMapping[currency] || defaultCurrency;
  const localized = price.toLocaleString(locale, { maximumFractionDigits: 2 });

  const classes = classNames({
    [className]: !!className,
    'localized-price': true,
    'text-4xl': true,
    'font-bold': true,
  });

  const symbolClasses = classNames({
    [symbolClassname]: !!symbolClassname,
    'currency-symbol': true,
    'text-base': true,
  });

  return (
    <strong className={classes}>
      <CurrencySymbol currency={currency} className={symbolClasses} />
      <span>{localized}</span>
    </strong>
  );
};

LocalizedPrice.propTypes = {
  price: PropTypes.number.isRequired,
  currency: PropTypes.string,
  className: PropTypes.string,
  symbolClassname: PropTypes.string,
};

export default LocalizedPrice;
