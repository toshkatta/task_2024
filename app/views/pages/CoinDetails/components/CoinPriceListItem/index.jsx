import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { selectCoinById } from '@/store/coins/selectors';

import ChangePercent from '@/views/components/ChangePercent';
import LocalizedPrice from '@/views/components/LocalizedPrice';
import CoinLogo from '@/views/components/CoinLogo';

import routes from '@/routes';

import './styles.scss';

const CoinPriceListItem = ({ id }) => {
  const coin = useSelector(selectCoinById(id));

  if (!coin) return null;

  return (
    <Link to={routes.getCoinPage(id)} className="coin-price-list-item text-black">
      <CoinLogo id={id} coinName={coin.name} className="coin-icon" />

      <span title={coin.name} className="text-ellipsis font-semibold">{coin.name}</span>

      <ChangePercent
        percent={coin.changePercent24Hr}
        className="justify-end"
      />

      <span className="font-semibold opacity-50">{coin.symbol.toUpperCase()}</span>

      <LocalizedPrice
        priceUSD={coin.priceUsd}
        className="font-semibold text-sm justify-end"
      />
    </Link>
  );
};

CoinPriceListItem.propTypes = {
  id: PropTypes.string.isRequired,
};

export default CoinPriceListItem;
