import { useSelector } from 'react-redux';

import { selectCoinName } from '@/store/coinDetails/selectors';

import ChangePercent from '@/views/components/ChangePercent';

import './styles.scss';

const Performance = () => {
  const coinName = useSelector(selectCoinName);

  return (
    <section className="performance">
      <div className="title">
        <h3 className="text-3xl">Performance</h3>
        <span className="text-md opacity-50">Update September 13.21 7:27 PM GMT+2</span>
      </div>

      <ul className="performance-indicators">
        <li>
          <span className="text-md opacity-50">Past year</span>
        </li>

        <li>
          <span className="text-md">{coinName}</span>
          <ChangePercent className="font-black" percent={334} compact />
        </li>

        <li>
          <span className="text-md">Market</span>
          <ChangePercent className="text-black font-black" percent={476} compact />
        </li>
      </ul>
    </section>
  );
};

export default Performance;
