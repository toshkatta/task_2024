import { useDispatch, useSelector } from 'react-redux';

import {
  selectRateIDs,
  selectSelectedRateID,
} from '@/store/rates/selectors';

import { rateSelected } from '@/store/rates/actions';

import Dropdown from '@/views/ui-kit/Dropdown';

import Currency from '../Currency';

import './styles.scss';

const CurrencyDropdown = () => {
  const dispatch = useDispatch();

  const rateIDs      = useSelector(selectRateIDs);
  const selectedRate = useSelector(selectSelectedRateID);

  const options = rateIDs.map((id) => ({
    id,
    element: <Currency id={id} className="font-medium pointer" />
  }));

  const onSelect = (key) => dispatch(rateSelected(key));

  return (
    <div className="text-sm currency-dropdown">
      <Dropdown
        options={options}
        onSelect={onSelect}
        title={<Currency id={selectedRate} className="font-medium" />}
      />
    </div>
  );
};

export default CurrencyDropdown;
