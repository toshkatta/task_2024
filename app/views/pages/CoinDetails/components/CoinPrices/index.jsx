import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  selectCoinIDs,
  selectCoinListType,
  selectHasWatchlistedCoins,
  selectWatchlistedCoinIDs,
} from '@/store/coins/selectors';

import { coinsListTypeChanged } from '@/store/coins/actions';

import routes from '@/routes';

import CoinListTypeDropdown from '../CoinListTypeDropdown';
import CoinListItem from '../CoinListItem';

import './styles.scss';

const CoinPrices = () => {
  const dispatch = useDispatch();

  const hasWatchlist = useSelector(selectHasWatchlistedCoins);

  const idsSelector = hasWatchlist
    ? selectWatchlistedCoinIDs
    : selectCoinIDs;

  const ids  = useSelector(idsSelector);
  const type = useSelector(selectCoinListType);

  const onListTypeChange = (type) => {
    dispatch(coinsListTypeChanged(type));
  };

  return (
    <section className="coin-prices">
      <div className="coin-prices-header">
        <h4>Prices</h4>
        <CoinListTypeDropdown value={type} onSelect={onListTypeChange} />
      </div>

      <ol className="coin-list">
        { ids.map((id) => <CoinListItem key={id} id={id} />) }
      </ol>

      <Link to={routes.home} className="link-container text-purple text-lg">
        <span className="color-purple font-semibold">View all tokens</span>
        <i className="link-icon fas fa-arrow-up" /></Link>
    </section>
  );
};

export default CoinPrices;
