import { useSelector } from 'react-redux';

import {
  selectCoinMarketCap,
  selectCoinMaxSupply,
  selectCoinRank,
  selectCoinSupply,
  selectCoinSymbol,
  selectCoinVolume,
} from '@/store/coinDetails/selectors';

import LocalizedPrice from '@/views/components/LocalizedPrice';
import ChangePercent from '@/views/components/ChangePercent';

import './styles.scss';

const MarketStats = () => {
  const marketCap = useSelector(selectCoinMarketCap);
  const volume    = useSelector(selectCoinVolume);
  const supply    = useSelector(selectCoinSupply);
  const maxSupply = useSelector(selectCoinMaxSupply);
  const rank      = useSelector(selectCoinRank);
  const symbol    = useSelector(selectCoinSymbol);

  const supplyPercent = maxSupply
    ? Math.floor((supply / maxSupply) * 100)
    : 'N/A';

  return (
    <section className="market-stats">
      <h4 className="text-2xl font-medium">Market stats</h4>

      <div className="activity-indicator">
        <span className="text-md opacity-50">Activity</span>
        <span className="text-md text-purple">70% buy</span>
        <div className="activity-icons">
          <i className="pill bg-purple"/>
          <i className="pill bg-purple"/>
          <i className="pill bg-purple"/>
          <i className="pill bg-purple"/>
          <i className="pill bg-purple"/>
          <i className="pill bg-purple"/>
          <i className="pill bg-purple"/>
          <i className="pill bg-black opacity-50"/>
          <i className="pill bg-black opacity-50"/>
          <i className="pill bg-black opacity-50"/>
        </div>
        <span className="text-md">30% sell</span>
      </div>

      <div className="popularity-container">
        <span className="text-md opacity-50">Popularity:</span>
        <span className="text-md font-bold">#{rank}</span>
      </div>

      <span className="text-md font-medium">Market cap</span>
      <LocalizedPrice compact priceUSD={marketCap} className="font-extrabold text-lg" />
      <span className="text-md opacity-50">33% of crypto market</span>

      <span className="text-md font-medium">Volume (24h)</span>
      <LocalizedPrice compact priceUSD={volume} className="font-extrabold text-lg" />
      <ChangePercent percent={45.02} />

      <span className="text-md font-medium">Circulating supply</span>
      <LocalizedPrice compact priceUSD={supply} cryptocurrency={symbol} className="font-extrabold text-lg" />
      <span className="text-md opacity-50">{supplyPercent}% of total supply</span>

      <span className="text-md font-medium">Typical hold time</span>
      <span className="font-extrabold text-lg">85 days</span>
    </section>
  );
};

export default MarketStats;
