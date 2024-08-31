import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

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

import { ButtonGreyL } from '@/views/ui-kit/Button';

import CurrencyDropdown from '../CurrencyDropdown';
import TimeDropdown from '../TimeDropdown';
import CandleGraph from '../CandleGraph';

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

  const iconClasses = classNames({
    'fa-star': true,
    fas: isWatchlisted,
    'text-purple': isWatchlisted,
    far: !isWatchlisted,
    'text-black': !isWatchlisted,
  });

  return (
    <section className="coin-stats">
      <section className="coin-stats-header">
        <i className={`logo text-white cc ${symbol.toUpperCase()} ${name.toUpperCase()}`} />
        <h2 className="text-4xl">{name}</h2>
        <em className="text-sm abbreviation">{symbol}</em>

        <ButtonGreyL className="watchlist-btn" onClick={onWatchlistClick}>
          <i className={iconClasses} />
            { isWatchlisted ? 'Watchlisted' : 'Watchlist' }
        </ButtonGreyL>
      </section>

      <section className="coin-stats-body">
        <LocalizedPrice
          priceUSD={price}
          className="localized-price text-4xl font-bold"
          symbolClassname="currency-symbol text-base"
        />
        <ChangePercent percent={percent} />

        <CurrencyDropdown />

        <TimeDropdown />
      </section>

      <CandleGraph />
    </section>
  );
};

export default CoinStats;
