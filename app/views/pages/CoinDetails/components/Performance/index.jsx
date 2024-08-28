import Heading from 'ui-kit/Typography/Heading';
import Text from 'ui-kit/Typography/Text';

import './styles.scss';

const Performance = () => {
  return (
    <section className="performance">
      <div className="title">
        <Heading size="h3">Performance</Heading>
        <Text size="sm">Update September 13.21 7:27 PM GMT+2</Text>
      </div>

      <ul className="performance-indicators">
        <li>
          <Text size="sm">Past year</Text>
        </li>

        <li>
          <Text size="sm">Bitcoin</Text>
          <Text size="sm">+334%</Text>
        </li>

        <li>
          <Text size="sm">Market</Text>
          <Text size="sm">+476%</Text>
        </li>
      </ul>
    </section>
  );
};

export default Performance;
