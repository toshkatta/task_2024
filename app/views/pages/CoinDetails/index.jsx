import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { coinDetailsVisited } from '@/store/coinDetails/actions';

import CoinStats from './components/CoinStats';
import MarketStats from './components/MarketStats';
import Performance from './components/Performance';
import TradeCrypto from './components/TradeCrypto';

import './styles.scss';

const CoinDetails = () => {
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(coinDetailsVisited(params.id));
  }, []);

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
