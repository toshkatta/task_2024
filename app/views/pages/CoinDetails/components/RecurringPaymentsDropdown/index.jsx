import PropTypes from 'prop-types';

import { paymentOptions } from '@/domain/Transactions';

import Dropdown from '@/views/ui-kit/Dropdown';

const intervalToTextMapping = {
  [paymentOptions.ONCE]: 'One time purchase',
  [paymentOptions.DAILY]: 'Once per day',
  [paymentOptions.WEEKLY]: 'Once per week',
  [paymentOptions.MONTHLY]: 'Once per month',
};

const intervals = [
  paymentOptions.ONCE,
  paymentOptions.DAILY,
  paymentOptions.WEEKLY,
  paymentOptions.MONTHLY,
];

const RecurringPaymentsDropdown = ({
  value,
  onSelect,
  className,
}) => {
  const options = intervals.map((i) => ({
    id: i,
    element: intervalToTextMapping[i]
  }));

  return (
    <div className={className}>
      <Dropdown
        options={options}
        onSelect={onSelect}
        title={<span>{intervalToTextMapping[value]}</span>}
      />
    </div>
  );
};

RecurringPaymentsDropdown.propTypes = {
  value: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default RecurringPaymentsDropdown;
