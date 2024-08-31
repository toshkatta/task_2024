import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { selectCoinById } from '@/store/coins/selectors';

import ChangePercent from '@/views/components/ChangePercent';
import LocalizedPrice from '@/views/components/LocalizedPrice';

import routes from '@/routes';

import './styles.scss';

const CoinListItem = ({ id }) => {
  const coin = useSelector(selectCoinById(id));

  return (
    <Link to={routes.getCoinPage(id)} className="coin-list-item text-black">
      <i className={`coin-icon text-2xl text-purple cc ${coin.symbol.toUpperCase()}`} />

      <span className="font-semibold">{coin.name}</span>

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

CoinListItem.propTypes = {
  id: PropTypes.string.isRequired,
};

export default CoinListItem;
