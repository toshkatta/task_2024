import './styles.scss';

const MarketStats = () => {
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

      <span className='text-sm'>Market cap</span>
      <span className='text-sm'>$700.6B</span>
      <span className='text-sm'>33% of crypto market</span>

      <span className='text-sm'>Volume (24h)</span>
      <span className='text-sm'>$33.9B</span>
      <span className='text-sm'>+45.02%</span>

      <span className='text-sm'>Circulating supply</span>
      <span className='text-sm'>18.8M BTC</span>
      <span className='text-sm'>90% of total supply</span>

      <span className='text-sm'>Typical hold time</span>
      <span className='text-sm'>85 days</span>
    </section>
  );
};

export default MarketStats;
