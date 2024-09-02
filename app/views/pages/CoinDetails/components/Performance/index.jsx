import { useSelector } from 'react-redux';
import Media from 'react-media';
import { format } from 'date-fns';

import { selectCoinName } from '@/store/coinDetails/selectors';

import ChangePercent from '@/views/components/ChangePercent';

import { getRandomPercentWithNegative } from '@/infrastructure/random';

import './styles.scss';

const Performance = () => {
  const coinName = useSelector(selectCoinName);

  const coinPercent = getRandomPercentWithNegative();
  const marketPercent = getRandomPercentWithNegative();

  return (
    <section className="performance">
      <div className="title font-semibold">
        <h3 className="text-2xl">Performance</h3>

        <Media query="(min-width: 460px)">
          {(matchesQuery) => (
              matchesQuery
                ? <span className="text-md opacity-50">Update {format(new Date(), 'PPPppp')}</span>
                : (
                  <>
                    <span className="text-md opacity-50">Update {format(new Date(), 'PPP')}</span>
                    <span className="text-md opacity-50">at {format(new Date(), 'ppp')}</span>
                  </>
                )
            )}
        </Media>
      </div>

      <ul className="performance-indicators">
        <li>
          <span className="text-md opacity-50">Past year</span>
        </li>

        <li>
          <span className="text-md font-semibold">{coinName}</span>
          <ChangePercent className="font-black" percent={coinPercent} compact />
        </li>

        <li>
          <span className="text-md font-semibold">Market</span>
          <ChangePercent className="text-black font-black" percent={marketPercent} compact />
        </li>
      </ul>
    </section>
  );
};

export default Performance;
