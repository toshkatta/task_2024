import { useSelector } from 'react-redux';

import {
  selectCoinChangePercent,
  selectCoinName,
  selectCoinPrice,
  selectCoinSymbol,
} from 'store/coinDetails/selectors';

import LocalizedPrice from 'components/LocalizedPrice';
import ChangePercent from 'components/ChangePercent';
import VerticalDivider from 'components/VerticalDivider';

import {
  ButtonGreyL,
  ButtonGreyS,
} from 'ui-kit/Button';

import './styles.scss';

const CoinStats = () => {
  const name    = useSelector(selectCoinName);
  const symbol  = useSelector(selectCoinSymbol);
  const price   = useSelector(selectCoinPrice);
  const percent = useSelector(selectCoinChangePercent);

  return (
    <section className="coin-stats">
      <section className="coin-stats-header">
        <i className={`logo fab fa-${symbol.toLowerCase()}`} />
        <h2 className='text-4xl'>{name}</h2>
        <em className="text-sm abbreviation">{symbol}</em>

        <ButtonGreyL className="watchlist-btn">
          <i className="fas fa-star" />
          <span className="text-sm">Watchlisted</span>
        </ButtonGreyL>
      </section>

      <section className="coin-stats-body">
        <LocalizedPrice price={price} className="coin-price" />
        <VerticalDivider />
        <ChangePercent percent={percent} />

        <span className="text-sm currency-dropdown-selected">$ USD</span>
        <ButtonGreyS>
          <i className="fas fa-chevron-down" />
        </ButtonGreyS>

        <span className="text-sm time-dropdown-selected">24 hours</span>
        <ButtonGreyS>
          <i className="fas fa-chevron-down" />
        </ButtonGreyS>
      </section>

      <div className="graph"></div>
    </section>
  );
};

export default CoinStats;
