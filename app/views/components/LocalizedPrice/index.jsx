import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import {
  currencyToLocaleMapping,
} from '@/domain/Rates';

import { selectSelectedRate } from '@/store/rates/selectors';

const LocalizedPrice = ({
  priceUSD,
  cryptocurrency,
  compact = false,
  className = '',
  symbolClassname = '',
}) => {
  const selected = useSelector(selectSelectedRate);

  if (!selected) return null;

  const price = cryptocurrency
    ? priceUSD
    : priceUSD / selected.rateUsd;

  const locale = currencyToLocaleMapping[selected.id];
  const localized = compact
    ? price.toLocaleString(locale, { notation: 'compact', maximumFractionDigits: 1 })
    : price.toLocaleString(locale, { maximumFractionDigits: 2 });

  return (
    <strong className={className}>
      { !cryptocurrency && <span className={symbolClassname}>{selected.currencySymbol}</span> }
      <span>{localized}</span>
      { cryptocurrency && <span className={symbolClassname}>&nbsp;{cryptocurrency.toUpperCase()}</span> }
    </strong>
  );
};

LocalizedPrice.propTypes = {
  priceUSD: PropTypes.number.isRequired,
  cryptocurrency: PropTypes.string,
  compact: PropTypes.bool,
  className: PropTypes.string,
  symbolClassname: PropTypes.string,
};

export default LocalizedPrice;
