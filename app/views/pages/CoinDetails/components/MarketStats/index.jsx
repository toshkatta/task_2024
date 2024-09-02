import { useSelector } from 'react-redux';
import Media from 'react-media';

import { getPercentOfTotalMarket } from '@/domain/Market';

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

import {
  getRandomInteger,
  getRandomPercent,
  getRandomPercentWithNegative,
} from '@/infrastructure/random';

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
    : null;

  const buyPercent = getRandomPercent();
  const buyPillsAmount = Math.round(buyPercent / 10);

  const volumePercent = getRandomPercentWithNegative();

  const holdDays = getRandomInteger(500);

  return (
    <section className="market-stats">
      <h3 className="title text-2xl font-bold">Market stats</h3>

      <div className="activity-indicator">
        <span className="text-md opacity-50">Activity</span>
        <span className="text-md text-purple">{buyPercent}% buy</span>
        <div className="activity-icons">
          <Media query="(min-width: 420px)">
            {(matchesQuery) => (
              <>
                {Array.from({ length: buyPillsAmount * (matchesQuery ? 2 : 1) }, (e, idx) => (
                  <i key={idx} className="pill bg-purple" />
                ))}
                {Array.from({ length: (10 - buyPillsAmount) * (matchesQuery ? 2 : 1) }, (e, idx) => (
                  <i key={idx + 20} className="pill bg-black opacity-50" />
                ))}
              </>
            )}
          </Media>
        </div>
        <span className="text-md">{100 - buyPercent}% sell</span>
      </div>

      <div className="popularity-container">
        <span className="text-md opacity-50">Popularity:</span>
        <span className="text-md font-bold">#{rank}</span>
      </div>

      <span className="market-title text-md font-semibold">Market cap</span>
      <LocalizedPrice compact priceUSD={marketCap} className="market-value font-extrabold text-lg" />
      <span className="market-percent text-md opacity-50">{getPercentOfTotalMarket(marketCap)}% of crypto market</span>

      <span className="volume-title text-md font-semibold">Volume (24h)</span>
      <LocalizedPrice compact priceUSD={volume} className="volume-value font-extrabold text-lg" />
      <ChangePercent percent={volumePercent} className="volume-percent" />

      <span className="supply-title text-md font-semibold">Circulating supply</span>
      <LocalizedPrice compact priceUSD={supply} cryptocurrency={symbol} className="supply-value font-extrabold text-lg" />
      { supplyPercent && <span className="supply-percent text-md opacity-50">{supplyPercent}% of total supply</span> }

      <span className="hold-title text-md font-semibold">Typical hold time</span>
      <span className="hold-days font-extrabold text-lg">{holdDays} days</span>
    </section>
  );
};

export default MarketStats;
