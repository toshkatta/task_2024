import { useDispatch, useSelector } from 'react-redux';

import { supportedTimeIntervals } from '@/domain/Rates';

import {selectSelectedInterval } from '@/store/rates/selectors';

import { intervalSelected } from '@/store/rates/actions';

import Dropdown from '@/views/ui-kit/Dropdown';

import './styles.scss';

const intervalToTextMapping = {
  [supportedTimeIntervals.DAY]: '24 hours',
  [supportedTimeIntervals.FIVE_DAYS]: '5 days',
  [supportedTimeIntervals.MONTH]: '1 month',
  [supportedTimeIntervals.YEAR]: '1 year',
  [supportedTimeIntervals.FIVE_YEARS]: '5 years',
};

const intervals = [
  supportedTimeIntervals.DAY,
  supportedTimeIntervals.FIVE_DAYS,
  supportedTimeIntervals.MONTH,
  supportedTimeIntervals.YEAR,
  supportedTimeIntervals.FIVE_YEARS,
];

const TimeDropdown = () => {
  const dispatch = useDispatch();

  const selectedInterval = useSelector(selectSelectedInterval);

  const options = intervals.map((i) => ({
    id: i,
    element: <span className="font-medium pointer">{intervalToTextMapping[i]}</span>
  }));

  const onSelect = (key) => dispatch(intervalSelected(key));

  return (
    <div className="text-sm time-dropdown">
      <Dropdown
        options={options}
        onSelect={onSelect}
        title={<span className="font-medium pointer">{intervalToTextMapping[selectedInterval]}</span>}
      />
    </div>
  );
};

export default TimeDropdown;
