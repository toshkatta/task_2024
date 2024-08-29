import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { selectRateSymbolById } from '@/store/rates/selectors';

const Currency = ({
  id,
  className = '',
}) => {
  const currencySymbol = useSelector(selectRateSymbolById(id));

  if (!currencySymbol) return null;

  return (
    <span className={className}>{currencySymbol} {id.toUpperCase()}</span>
  );
};

Currency.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Currency;
