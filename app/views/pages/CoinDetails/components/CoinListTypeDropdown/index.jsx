import PropTypes from 'prop-types';

import { coinListTypes } from '@/domain/Coins';

import Dropdown from '@/views/ui-kit/Dropdown';

const typeToTextMapping = {
  [coinListTypes.WATCHLIST]: 'Watchlist',
  [coinListTypes.ALL]: 'All tokens',
};

const CoinListTypeDropdown = ({
  value,
  onSelect,
  className,
}) => {
  const options = Object.values(coinListTypes).map((t) => ({
    id: t,
    element: typeToTextMapping[t]
  }));

  return (
    <div className={className}>
      <Dropdown
        options={options}
        onSelect={onSelect}
        title={<span>{typeToTextMapping[value]}</span>}
      />
    </div>
  );
};

CoinListTypeDropdown.propTypes = {
  value: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default CoinListTypeDropdown;
