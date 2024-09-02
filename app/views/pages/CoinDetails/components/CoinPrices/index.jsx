import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { coinListTypes } from '@/domain/Coins';

import {
  selectCoinIDs,
  selectCoinListType,
  selectWatchlistedCoinIDs,
} from '@/store/coins/selectors';

import {
  coinsListTypeChanged,
  coinsRequested,
} from '@/store/coins/actions';

import CustomScrollbar from '@/views/components/CustomScrollbar';

import routes from '@/routes';

import CoinListTypeDropdown from '../CoinListTypeDropdown';
import CoinPriceListItem from '../CoinPriceListItem';

import './styles.scss';

const CoinPrices = () => {
  const dispatch = useDispatch();

  const type = useSelector(selectCoinListType);

  const isWatchlist = type === coinListTypes.WATCHLIST;
  const idsSelector = isWatchlist
    ? selectWatchlistedCoinIDs
    : selectCoinIDs;

  const ids = useSelector(idsSelector);

  const [page, setPage] = useState(1);

  const listRef = useRef(null);

  useEffect(() => {
    if (!listRef.current || !ids.length) return;

    const scrollContainer = listRef.current.firstChild.firstChild;
    scrollContainer.scrollTo({ top: scrollContainer.scrollHeight, behavior: 'smooth' });
  }, [ids.length]);

  const onListTypeChange = (type) => {
    dispatch(coinsListTypeChanged(type));
  };

  const onLoadMoreClick = () => {
    setPage((page) => page + 1);

    dispatch(coinsRequested({
      page: page + 1,
      limit: 3,
    }));
  };

  return (
    <section className="coin-prices">
      <div className="coin-prices-header">
        <h4 className="text-2xl font-bold">Prices</h4>

        <CoinListTypeDropdown
          value={type}
          onSelect={onListTypeChange}
          className='font-semibold'
        />
      </div>

      <ol ref={listRef} className="coin-price-list">
        {
          ids.length
            ? (
              <CustomScrollbar>
                { ids.map((id) => <li key={id}><CoinPriceListItem id={id} /></li>) }
                { !isWatchlist && (
                  <button
                    className="load-more-coins text-purple text-lg font-semibold pointer"
                    onClick={onLoadMoreClick}
                  >
                    Load more
                  </button>
                )}
              </CustomScrollbar>
            )
            : (
              <span className="no-watchlist text-black text-sm font-semibold opacity-50">
                No coins available.
              </span>
            )
        }
      </ol>

      <Link to={routes.home} className="link-container text-purple text-lg">
        <span className="color-purple font-semibold">View all tokens</span>
        <i className="link-icon fas fa-arrow-up" />
      </Link>
    </section>
  );
};

export default CoinPrices;
