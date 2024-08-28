import {
  ButtonGreyL,
  ButtonGreyS,
} from 'ui-kit/Button';
import Heading from 'ui-kit/Typography/Heading';
import Text from 'ui-kit/Typography/Text';

import './styles.scss';

const CoinStats = () => {
  return (
    <section className="coin-stats">
      <section className="coin-stats-header">
        <i className="logo fab fa-btc" />
        <Heading size="h2">Bitcoin</Heading>
        <em className="abbreviation">BTC</em>

        <ButtonGreyL className="watchlist-btn">
          <i className="fas fa-star" />
          <Text size="sm">Watchlisted</Text>
        </ButtonGreyL>
      </section>

      <section className="coin-stats-body">
        <span className="currency">$</span>
        <strong className="coin-price">{38519.12.toLocaleString('en-US')}</strong>
        <i className="vertical-divider" />
        <span className="change-plus">+{5.61.toLocaleString('en-US')}%</span>

        <Text size="sm" className="currency-dropdown-selected">$ USD</Text>
        <ButtonGreyS>
          <i className="fas fa-chevron-down" />
        </ButtonGreyS>

        <Text size="sm" className="time-dropdown-selected">24 hours</Text>
        <ButtonGreyS>
          <i className="fas fa-chevron-down" />
        </ButtonGreyS>
      </section>

      <div className="graph"></div>
    </section>
  );
};

export default CoinStats;
