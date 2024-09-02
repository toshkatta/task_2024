import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { rateToLocaleMapping } from '@/domain/Rates';
import { formatPrice } from '@/domain/Localization';

import { selectSelectedRate } from '@/store/rates/selectors';

const LocalizedPrice = ({
  priceUSD,
  cryptocurrency,
  digits,
  compact = false,
  className = '',
  symbolClassname = '',
}) => {
  const selected = useSelector(selectSelectedRate);

  if (!selected) return null;

  const price = cryptocurrency
    ? priceUSD
    : priceUSD / selected.rateUsd;

  const locale = rateToLocaleMapping[selected.id];

  const formatted = formatPrice({
    digits,
    price,
    compact,
    locale,
  });

  return (
    <strong className={className} title={price}>
      {!cryptocurrency && <span className={symbolClassname}>{selected.currencySymbol}</span>}
      <span>{formatted}</span>
      {cryptocurrency && <span className={symbolClassname}>&nbsp;{cryptocurrency.toUpperCase()}</span>}
    </strong>
  );
};

LocalizedPrice.propTypes = {
  priceUSD: PropTypes.number.isRequired,
  cryptocurrency: PropTypes.string,
  compact: PropTypes.bool,
  className: PropTypes.string,
  symbolClassname: PropTypes.string,
  digits: PropTypes.number,
};

export default LocalizedPrice;
