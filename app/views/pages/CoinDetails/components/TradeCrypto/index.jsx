import { useSelector } from 'react-redux';
import { Form, Formik } from 'formik';

import {
  maximumTransactionAmount,
  minimumTransactionAmount,
} from '@/domain/Transactions';

import {
  selectCoinPrice,
  selectCoinSymbol,
} from '@/store/coinDetails/selectors';
import { selectSelectedRate } from '@/store/rates/selectors';

import { ButtonPurpleL } from '@/views/ui-kit/Button';
import {
  CurrencyInputField,
  ErrorFocus,
} from '@/views/ui-kit/FormFields';

import { isNumeric } from '@/infrastructure/validation/isNumeric';

import tradeCryptoSchema from './validationSchema';

import './styles.scss';

const TradeCrypto = () => {

  const cryotoSymbol = useSelector(selectCoinSymbol);
  const cryotoPrice  = useSelector(selectCoinPrice);
  const rate         = useSelector(selectSelectedRate);

  if (!rate) return null;

  const getCryptoAmount = (fiatAmount) => (
    isNumeric(fiatAmount)
      ? (fiatAmount * rate.rateUsd / cryotoPrice).toString()
      : ''
  );

  const handleSubmit = (values) => {
    console.log('values:', values);
  };

  return (
    <section className="trade-crypto">
      <div className="trade-btns">
        <button>Buy {cryotoSymbol}</button>
        <button>Sell {cryotoSymbol}</button>
      </div>

      <Formik
        initialValues={{ fiatAmount: '', cryotoAmount: '' }}
        initialTouched={{ fiatAmount: true }}
        validationSchema={tradeCryptoSchema({
          minimum: minimumTransactionAmount,
          maximum: maximumTransactionAmount,
        })}
        onSubmit={handleSubmit}
      >
        {({ values, errors }) => (
          <Form autoComplete="off" className="trade-inputs">
              <CurrencyInputField
                className="font-medium"
                name="fiatAmount"
                placeholder="0.00"
                label="You will pay"
              />

              <CurrencyInputField
                className="font-medium"
                name="cryptoAmount"
                placeholder="0.00"
                label="You will receive"
                disabled
                value={getCryptoAmount(values.fiatAmount)}
              />

              <ErrorFocus />

              <ButtonPurpleL
                type="submit"
                disabled={!!errors.fiatAmount}
              >
                Buy {cryotoSymbol}
              </ButtonPurpleL>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default TradeCrypto;
