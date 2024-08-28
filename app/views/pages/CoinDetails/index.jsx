import CoinStats from './components/CoinStats';
import MarketStats from './components/MarketStats';
import Performance from './components/Performance';
import TradeCrypto from './components/TradeCrypto';

import './styles.scss';

const CoinDetails = () => {
  return (
    <article className="coin-details">
      <main>
        <CoinStats />
        <MarketStats />
        <Performance />
      </main>
      <aside className="sidebar">
        <TradeCrypto />
      </aside>
    </article>
  );
};

export default CoinDetails;
