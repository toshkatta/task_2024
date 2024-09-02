import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  selectRateIDs,
  selectSelectedRateID,
} from '@/store/rates/selectors';

import { rateSelected } from '@/store/rates/actions';

import Dropdown from '@/views/ui-kit/Dropdown';

import Currency from '../Currency';

const CurrencyDropdown = ({ className }) => {
  const dispatch = useDispatch();

  const rateIDs      = useSelector(selectRateIDs);
  const selectedRate = useSelector(selectSelectedRateID);

  const options = rateIDs.map((id) => ({
    id,
    element: <Currency id={id}/>
  }));

  const onSelect = (key) => dispatch(rateSelected(key));

  const classes = classNames({
    'text-sm': true,
    [className]: !!className,
  });

  return (
    <div className={classes}>
      <Dropdown
        options={options}
        onSelect={onSelect}
        title={<Currency id={selectedRate} className="font-medium" />}
      />
    </div>
  );
};

CurrencyDropdown.propTypes = {
  className: PropTypes.string,
};

export default CurrencyDropdown;
