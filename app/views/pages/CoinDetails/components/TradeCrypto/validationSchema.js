import * as Yup from 'yup';

import { isNumeric } from '@/infrastructure/validation/isNumeric';

const tradeCryptoSchema = ({ minimum, maximum }) => Yup.object().shape({
  fiatAmount: Yup.string()
    .test('has a value', 'Please enter a valid amount.', (value) => (
      !!value
    ))
    .test('is numeric', 'Please enter a number.', (value) => (
      isNumeric(value)
    ))
    .test('is over 0', 'Please enter a valid number.', (value) => (
      parseFloat(value) > 0
    ))
    .test('is over the minimm', `We do not support transactions under ${minimum.toLocaleString()}.`, (value) => (
      parseFloat(value) >= minimum
    ))
    .test('is within the limit', `We do not support transactions over ${maximum.toLocaleString()}.`, (value) => (
      parseFloat(value) < maximum
    )),
});

export default tradeCryptoSchema;
