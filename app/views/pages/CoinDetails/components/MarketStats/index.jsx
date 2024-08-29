import { useSelector } from 'react-redux';

import {
  selectCoinMarketCap,
  selectCoinMaxSupply,
  selectCoinSupply,
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

  const supplyPercent = Math.floor((supply / maxSupply) * 100);

  return (
    <section className="market-stats">
      <h4 className='text-2xl'>Market stats</h4>

      <div className="activity-indicator">
        <span className='text-sm'>Activity</span>
        <span className='text-sm'>70% buy</span>
        <div className="activity-icons">
          <i />
          <i />
          <i />
          <i />
          <i />
          <i />
          <i />
          <i />
          <i />
          <i />
        </div>
        <span className='text-sm'>30% sell</span>
      </div>

      <div className="popularity-container">
        <span className='text-sm'>Popularity:</span>
        <span className='text-sm'>#1</span>
      </div>

      <span className='text-sm font-medium'>Market cap</span>
      <LocalizedPrice compact price={marketCap} className='font-extrabold text-lg' />
      <span className='text-sm opacity-50'>33% of crypto market</span>

      <span className='text-sm font-medium'>Volume (24h)</span>
      <LocalizedPrice compact price={volume} className='font-extrabold text-lg' />
      <ChangePercent percent={45.02} />

      <span className='text-sm font-medium'>Circulating supply</span>
      <LocalizedPrice compact price={supply} currency='btc' className='font-extrabold text-lg' />
      <span className='text-sm opacity-50'>{supplyPercent}% of total supply</span>

      <span className='text-sm font-medium'>Typical hold time</span>
      <span className='font-extrabold text-lg'>85 days</span>
    </section>
  );
};

export default MarketStats;
