import { useSelector } from 'react-redux';
import { Form, Formik } from 'formik';
import classNames from 'classnames';

import {
  maximumTransactionAmount,
  minimumTransactionAmount,
  paymentOptions,
} from '@/domain/Transactions';

import {
  selectCoinPrice,
  selectCoinSymbol,
} from '@/store/coinDetails/selectors';
import { selectSelectedRate } from '@/store/rates/selectors';

import LocalizedPrice from '@/views/components/LocalizedPrice';
import { ButtonPurpleL } from '@/views/ui-kit/Button';
import {
  CurrencyInputField,
  ErrorFocus,
} from '@/views/ui-kit/FormFields';

import { isNumeric } from '@/infrastructure/validation/isNumeric';

import RecurringPaymentsDropdown from '../RecurringPaymentsDropdown';

import tradeCryptoSchema from './validationSchema';

import './styles.scss';

const TradeCrypto = () => {

  const coinSymbol = useSelector(selectCoinSymbol);
  const coinPrice  = useSelector(selectCoinPrice);
  const rate       = useSelector(selectSelectedRate);

  if (!rate) return null;

  const getCryptoAmount = (payAmount) => (
    isNumeric(payAmount)
      ? (payAmount * rate.rateUsd / coinPrice).toString()
      : ''
  );

  const getFiatAmount = (payAmount) => (
    isNumeric(payAmount)
      ? (payAmount * coinPrice / rate.rateUsd).toString()
      : ''
  );

  const getReceiveAmount = ({ payAmount, isBuying }) => (
    isBuying
      ? getCryptoAmount(payAmount)
      : getFiatAmount(payAmount)
  );

  const switchToBuying = ({ setFieldValue, resetForm }) => () => {
    resetForm();
    setFieldValue('isBuying', true);
  };

  const switchToSelling = ({ setFieldValue, resetForm }) => () => {
    resetForm();
    setFieldValue('isBuying', false);
  };

  const handleSubmit = (values) => {
    console.log('values:', values);
  };

  const getSwitchButtonClasses = (isActive) => classNames({
    'switch-btn': true,
    'text-base': true,
    'font-semibold': true,
    pointer: true,
    active: isActive,
  });

  return (
    <Formik
      initialValues={{
        payAmount: '',
        receiveAmount: '',
        isBuying: true,
        paymentOption: paymentOptions.ONCE,
      }}
      initialTouched={{ payAmount: true }}
      validationSchema={tradeCryptoSchema({
        minimum: minimumTransactionAmount,
        maximum: maximumTransactionAmount,
      })}
      onSubmit={handleSubmit}
    >
      {({ values, errors, setFieldValue, resetForm }) => (
        <section className="trade-crypto">
          <div className="switch-btns-container">
            <button
              onClick={switchToBuying({ setFieldValue, resetForm })}
              className={getSwitchButtonClasses(values.isBuying)}
            >
              Buy {coinSymbol}
            </button>

            <button
              onClick={switchToSelling({ setFieldValue, resetForm })}
              className={getSwitchButtonClasses(!values.isBuying)}
            >
              Sell {coinSymbol}
            </button>
          </div>

          <Form key={values.isBuying} autoComplete="off" className="trade-inputs">
            <CurrencyInputField
              className="font-medium"
              name="payAmount"
              placeholder="0.00"
              label="You will pay"
            />

            <CurrencyInputField
              className="font-medium"
              name="receiveAmount"
              placeholder="0.00"
              label="You will receive"
              disabled
              value={getReceiveAmount(values)}
            />

            <ErrorFocus />

            <ButtonPurpleL
              type="submit"
              disabled={!!errors.payAmount}
            >
              {values.isBuying ? 'Buy' : 'Sell'} {coinSymbol}
            </ButtonPurpleL>

            <RecurringPaymentsDropdown
              className="payments-dropdown text-md"
              value={values.paymentOption}
              onSelect={(o) => setFieldValue('paymentOption', o)}
            />
          </Form>

          <div className="price-container opacity-50">
            <span>{coinSymbol} Balance</span>
            <span className="font-semibold">1 {coinSymbol} &asymp; <LocalizedPrice priceUSD={coinPrice} /></span>
          </div>
        </section>
      )}
    </Formik>
  );
};

export default TradeCrypto;
