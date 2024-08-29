import VerticalDivider from '@/views/components/VerticalDivider';
import ChangePercent from '@/views/components/ChangePercent';

import './styles.scss';

const Performance = () => {
  return (
    <section className="performance">
      <div className="title">
        <h3 className='text-3xl'>Performance</h3>
        <span className="text-sm">Update September 13.21 7:27 PM GMT+2</span>
      </div>

      <ul className="performance-indicators">
        <li>
          <span className="text-sm">Past year</span>
        </li>

        <VerticalDivider block />

        <li>
          <span className="text-sm">Bitcoin</span>
          <ChangePercent className='font-black' percent={334} />
        </li>

        <VerticalDivider block />

        <li>
          <span className="text-sm">Market</span>
          <ChangePercent className='market-percent font-black' percent={476} />
        </li>
      </ul>
    </section>
  );
};

export default Performance;
