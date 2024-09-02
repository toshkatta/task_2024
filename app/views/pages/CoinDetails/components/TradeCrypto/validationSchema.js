import * as Yup from 'yup';

import {
  maximumCryptoTransactionAmount,
  maximumFiatTransactionAmount,
  minimumCryptoTransactionAmount,
  minimumFiatTransactionAmount,
} from '@/domain/Transactions';

import { isNumeric } from '@/infrastructure/validation/isNumeric';

const tradeCryptoSchema = ({ fiatBalance, coinBalance }) => Yup.object().shape({
  payAmount: Yup.string()
    .test('has a value', 'Please enter a valid amount.', (value) => (
      !!value
    ))
    .test('is numeric', 'Please enter a number.', (value) => (
      isNumeric(value)
    ))
    .test('is over 0', 'Please enter a valid number.', (value) => (
      parseFloat(value) > 0
    ))
    .when('isBuying', {
      is: true,
      then: (schema) => schema
        .test('is within the balance', 'Insufficient funds', (value) => (
          parseFloat(value) <= fiatBalance
        ))
        .test('is over the minimum', `We do not support transactions under ${minimumFiatTransactionAmount.toLocaleString()}.`, (value) => (
          parseFloat(value) >= minimumFiatTransactionAmount
        ))
        .test('is within the limit', `We do not support transactions over ${maximumFiatTransactionAmount.toLocaleString()}.`, (value) => (
          parseFloat(value) < maximumFiatTransactionAmount
        )),
      otherwise: (schema) => schema
        .test('is within the balance', 'Insufficient funds', (value) => (
          parseFloat(value) <= coinBalance
        ))
        .test('is over the minimum', `We do not support transactions under ${minimumCryptoTransactionAmount.toFixed(8)}.`, (value) => (
          parseFloat(value) >= minimumCryptoTransactionAmount
        ))
        .test('is within the limit', `We do not support transactions over ${maximumCryptoTransactionAmount}.`, (value) => (
          parseFloat(value) < maximumCryptoTransactionAmount
        ))
    }),
});

export default tradeCryptoSchema;
