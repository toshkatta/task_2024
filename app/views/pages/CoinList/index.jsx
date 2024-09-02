import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Media from 'react-media';

import { coinsRequested } from '@/store/coins/actions';
import { selectCoinIDs } from '@/store/coins/selectors';

import CoinListItem from './components/CoinListItem';

import './styles.scss';

const CoinList = () => {
  const dispatch = useDispatch();

  const ids = useSelector(selectCoinIDs);

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(coinsRequested());
  }, []);

  const onLoadMoreClick = () => {
    setPage((page) => page + 1);
    dispatch(coinsRequested({ page: page + 1}));
  };

  return (
    <article className="coin-list bg-white">
      <div className="list-titles item text-sm font-semibold">
        <Media query="(min-width: 770px)">
          <span className="self-center">Rank</span>
        </Media>
        <span className="self-center">Logo</span>
        <span>Name</span>
        <span className="self-center">Change 24h</span>
        <span>Price</span>
        <Media query="(min-width: 1300px)">
          <span>Supply</span>
        </Media>
        <Media query="(min-width: 460px)">
          <span>Market cap</span>
        </Media>
        <Media query="(min-width: 770px)">
          <span>Volume</span>
        </Media>
        <Media query="(min-width: 390px)">
          <span className="self-center">Wishlist</span>
        </Media>
      </div>

      { ids.map((id) => <CoinListItem key={id} id={id} className="item" />) }

      <button
        className="load-more-coins text-purple text-lg font-semibold pointer"
        onClick={onLoadMoreClick}
      >
        Load more
      </button>
    </article>
  );
};

export default CoinList;
