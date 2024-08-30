import { useSelector } from 'react-redux';

import {
  selectCoinChangePercent,
  selectCoinName,
  selectCoinPrice,
  selectCoinSymbol,
} from '@/store/coinDetails/selectors';

import LocalizedPrice from '@/views/components/LocalizedPrice';
import ChangePercent from '@/views/components/ChangePercent';
import VerticalDivider from '@/views/components/VerticalDivider';

import { ButtonGreyL } from '@/views/ui-kit/Button';

import CurrencyDropdown from '../CurrencyDropdown';
import TimeDropdown from '../TimeDropdown';
import CandleGraph from '../CandleGraph';

import './styles.scss';

const CoinStats = () => {
  const name    = useSelector(selectCoinName);
  const symbol  = useSelector(selectCoinSymbol);
  const price   = useSelector(selectCoinPrice);
  const percent = useSelector(selectCoinChangePercent);

  return (
    <section className="coin-stats">
      <section className="coin-stats-header">
        <i className={`logo text-white fab fa-${symbol.toLowerCase()} fa-${name.toLowerCase()}`} />
        <h2 className="text-4xl">{name}</h2>
        <em className="text-sm abbreviation">{symbol}</em>

        <ButtonGreyL className="watchlist-btn">
          <i className="fas fa-star" />
          <span className="text-sm">Watchlisted</span>
        </ButtonGreyL>
      </section>

      <section className="coin-stats-body">
        <LocalizedPrice
          priceUSD={price}
          className="localized-price text-4xl font-bold"
          symbolClassname="currency-symbol text-base"
        />
        <VerticalDivider />
        <ChangePercent percent={percent} />

        <CurrencyDropdown />

        <TimeDropdown />
      </section>

      <CandleGraph />
    </section>
  );
};

export default CoinStats;
