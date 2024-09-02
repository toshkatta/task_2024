import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Form, Formik } from 'formik';
import classNames from 'classnames';

import {
  paymentOptions,
  transactionTypes,
} from '@/domain/Transactions';

import {
  selectCoinID,
  selectCoinPrice,
  selectCoinSymbol,
} from '@/store/coinDetails/selectors';
import { selectSelectedRate } from '@/store/rates/selectors';
import {
  selectWalletCoinAmount,
  selectWalletUSDAmount,
} from '@/store/wallet/selectors';

import LocalizedPrice from '@/views/components/LocalizedPrice';
import { ButtonPurpleL } from '@/views/ui-kit/Button';
import {
  CurrencyInputField,
  ErrorFocus,
} from '@/views/ui-kit/FormFields';
import TransactionModal from '@/views/components/modals/TransactionModal';
import RecurringPaymentsModal from '@/views/components/modals/RecurringPaymentsModal';

import { isNumeric } from '@/infrastructure/validation/isNumeric';

import RecurringPaymentsDropdown from '../RecurringPaymentsDropdown';

import tradeCryptoSchema from './validationSchema';

import './styles.scss';

const TradeCrypto = () => {

  const coinID     = useSelector(selectCoinID);
  const coinSymbol = useSelector(selectCoinSymbol);
  const coinPrice  = useSelector(selectCoinPrice);
  const rate       = useSelector(selectSelectedRate);
  const walletUSD  = useSelector(selectWalletUSDAmount);
  const walletCoin = useSelector(selectWalletCoinAmount(coinID));

  const [modalProps, setModalProps] = useState({});
  const closeModal = () => setModalProps({ isOpen: false });

  if (!rate) return null;

  const getCryptoAmount = (payAmount) => parseFloat(payAmount) * rate.rateUsd / coinPrice;
  const getFiatAmount   = (payAmount) => parseFloat(payAmount) * coinPrice / rate.rateUsd;

  const getReceiveAmount = ({ payAmount, isBuying }) => {
    if (!isNumeric(payAmount)) return '';

    return (
      isBuying
        ? getCryptoAmount(payAmount).toFixed(18)
        : getFiatAmount(payAmount).toFixed(18)
    );
  };

  const switchToBuying = ({ setFieldValue, resetForm }) => () => {
    resetForm();
    setFieldValue('isBuying', true);
  };

  const switchToSelling = ({ setFieldValue, resetForm }) => () => {
    resetForm();
    setFieldValue('isBuying', false);
  };

  const handleSubmit = (values) => {
    setModalProps({
      fiatAmount: values.isBuying
        ? parseFloat(values.payAmount)
        : getFiatAmount(values.payAmount),
      coinAmount: values.isBuying
        ? getCryptoAmount(values.payAmount)
        : parseFloat(values.payAmount),
      type: values.isBuying
        ? transactionTypes.BUYING
        : transactionTypes.SELLING,
      isOpen: true,
    });
  };

  const renderModal = (paymentOption) => {
    if (!modalProps.isOpen) return;

    return paymentOption === paymentOptions.ONCE
      ? <TransactionModal {...modalProps} onClose={closeModal} />
      : <RecurringPaymentsModal {...modalProps} onClose={closeModal} />
  }

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
        fiatBalance: walletUSD * rate.rateUsd,
        coinBalance: walletCoin,
      })}
      onSubmit={handleSubmit}
    >
      {({ values, errors, setFieldValue, resetForm }) => (
        <>
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
                className="payments-dropdown text-md font-semibold"
                value={values.paymentOption}
                onSelect={(o) => setFieldValue('paymentOption', o)}
              />
            </Form>

            <div className="price-container opacity-50">
              <LocalizedPrice priceUSD={walletCoin || 0} cryptocurrency={coinSymbol} />

              <span className="font-semibold" title={coinPrice}>
                1 {coinSymbol} &asymp; <LocalizedPrice priceUSD={coinPrice} />
              </span>
            </div>
          </section>

          { renderModal(values.paymentOption) }
        </>
      )}
    </Formik>
  );
};

export default TradeCrypto;
