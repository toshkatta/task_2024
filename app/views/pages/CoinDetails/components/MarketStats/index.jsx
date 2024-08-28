import Heading from 'ui-kit/Typography/Heading';
import Text from 'ui-kit/Typography/Text';

import './styles.scss';

const MarketStats = () => {
  return (
    <section className="market-stats">
      <Heading size="h4">Market stats</Heading>

      <div className="activity-indicator">
        <Text size="sm">Activity</Text>
        <Text size="sm">70% buy</Text>
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
        <Text size="sm">30% sell</Text>
      </div>

      <div className="popularity-container">
        <Text size="sm">Popularity:</Text>
        <Text size="sm">#1</Text>
      </div>

      <Text size="sm">Market cap</Text>
      <Text size="sm">$700.6B</Text>
      <Text size="sm">33% of crypto market</Text>

      <Text size="sm">Volume (24h)</Text>
      <Text size="sm">$33.9B</Text>
      <Text size="sm">+45.02%</Text>

      <Text size="sm">Circulating supply</Text>
      <Text size="sm">18.8M BTC</Text>
      <Text size="sm">90% of total supply</Text>

      <Text size="sm">Typical hold time</Text>
      <Text size="sm">85 days</Text>
    </section>
  );
};

export default MarketStats;
