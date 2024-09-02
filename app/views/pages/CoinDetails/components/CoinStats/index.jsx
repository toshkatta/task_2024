import { useDispatch, useSelector } from 'react-redux';
import Media from 'react-media';

import {
  selectCoinChangePercent,
  selectCoinID,
  selectCoinName,
  selectCoinPrice,
  selectCoinSymbol,
} from '@/store/coinDetails/selectors';
import { selectIsCoinWatchlisted } from '@/store/coins/selectors';

import { coinToggled } from '@/store/coins/actions';

import LocalizedPrice from '@/views/components/LocalizedPrice';
import ChangePercent from '@/views/components/ChangePercent';
import CoinLogo from '@/views/components/CoinLogo';
import WishlistIcon from '@/views/components/WishlistIcon';

import { ButtonGreyL } from '@/views/ui-kit/Button';

import CurrencyDropdown from '../CurrencyDropdown';
import TimeDropdown from '../TimeDropdown';
import CoinHistoryGraph from '../CoinHistoryGraph';

import './styles.scss';

const CoinStats = () => {
  const dispatch = useDispatch();

  const name          = useSelector(selectCoinName);
  const symbol        = useSelector(selectCoinSymbol);
  const price         = useSelector(selectCoinPrice);
  const percent       = useSelector(selectCoinChangePercent);
  const id            = useSelector(selectCoinID);
  const isWatchlisted = useSelector(selectIsCoinWatchlisted(id));

  const onWatchlistClick = () => dispatch(coinToggled(id));

  return (
    <section className="coin-stats">
      <section className="coin-stats-header">
        <CoinLogo id={id} coinName={name} className="main-logo" />

        <div className="coin-name-container font-bold">
          <h1 className="text-2xl">{name}</h1>
          <h2 className="text-lg opacity-50">{symbol}</h2>
        </div>

        <ButtonGreyL className="watchlist-btn" onClick={onWatchlistClick}>
          <WishlistIcon id={id} />
          <Media query="(min-width: 430px)">
            <span>{ isWatchlisted ? 'Watchlisted' : 'Watchlist' }</span>
          </Media>
        </ButtonGreyL>
      </section>

      <section className="coin-stats-body">
        <Media query="(min-width: 380px)">
          {(matchesQuery) => (
            <LocalizedPrice
              priceUSD={price}
              className={`coin-price font-extrabold text-${matchesQuery ? 4 : 3}xl`}
              symbolClassname="currency-symbol text-base"
            />
          )}
        </Media>
        <ChangePercent percent={percent} />

        <CurrencyDropdown className="currency-dropdown" />

        <TimeDropdown />
      </section>

      <section className="responsive-graph">
        <CoinHistoryGraph />
      </section>
    </section>
  );
};

export default CoinStats;
