import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import Media from 'react-media';

import { supportedPaymentIntervals, transactionTypes } from '@/domain/Transactions';

import { selectSelectedRate } from '@/store/rates/selectors';
import {
  selectCoinID,
  selectCoinSymbol,
} from '@/store/coinDetails/selectors';
import {
  selectWalletCoinAmount,
  selectWalletUSDAmount,
} from '@/store/wallet/selectors';

import { ButtonPurpleL } from '@/views/ui-kit/Button';
import LocalizedPrice from '@/views/components/LocalizedPrice';
import Dropdown from '@/views/ui-kit/Dropdown';

import './styles.scss';

const intervalToTextMapping = {
  [supportedPaymentIntervals.HOUR]: 'hourly',
  [supportedPaymentIntervals.DAY]: 'dayly',
  [supportedPaymentIntervals.WEEK]: 'weekly',
  [supportedPaymentIntervals.MONTH]: 'monthly',
};

const RecurringPaymentsModal = ({
  coinAmount,
  fiatAmount,
  type,
  onClose,
  className,
}) => {
  const coinID     = useSelector(selectCoinID);
  const coinSymbol = useSelector(selectCoinSymbol);
  const rate       = useSelector(selectSelectedRate);
  const walletUSD  = useSelector(selectWalletUSDAmount);
  const walletCoin = useSelector(selectWalletCoinAmount(coinID));

  const [paymentInterval, setPaymentInterval] = useState(supportedPaymentIntervals.HOUR);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27)
        onClose();
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  const isBuying = type === transactionTypes.BUYING;

  const options = Object.values(supportedPaymentIntervals).map((i) => ({
    id: i,
    element: intervalToTextMapping[i]
  }));

  const renderFiat = () => (
    <LocalizedPrice
      className='text-md font-semibold'
      priceUSD={fiatAmount * rate.rateUsd}
      digits={20}
    />
  );

  const renderCrypto = () => (
    <LocalizedPrice
      className='text-md font-semibold'
      priceUSD={coinAmount}
      cryptocurrency={coinSymbol}
      digits={20}
    />
  );

  const classes = classNames({
    'recurring-payments-modal': true,
    [className]: !!className,
  });

  return (
    <div className="recurring-payments-modal-overlay">
      <section className={classes}>
        <i onClick={onClose} className="close-icon fas fa-times text-sm pointer opacity-50" />

        <h6 className="text-xl font-semibold col-span-2 self-center">Transaction details:</h6>

        <span className='col-span-2 font-medium self-center'>Type: Recurring payments</span>

        <Media query="(min-width: 600px)">
          {(matchesQuery) => (
            <div className={`amount-container ${matchesQuery ? '' : 'col-span-2'}`}>
              <span>Amount to add:</span>
              {isBuying ? renderCrypto() : renderFiat()}
            </div>
          )}
        </Media>

        <Media query="(min-width: 600px)">
          {(matchesQuery) => (
            <div className={`amount-container ${matchesQuery ? '' : 'col-span-2'}`}>
              <span>Amount to deduct:</span>
              {isBuying ? renderFiat() : renderCrypto()}
            </div>
          )}
        </Media>

        <Media query="(min-width: 600px)">
          {(matchesQuery) => (
            <div className={`amount-container ${matchesQuery ? '' : 'col-span-2'}`}>
              <span>Current balance:</span>
              <LocalizedPrice
                className='text-md font-semibold'
                priceUSD={walletUSD / rate.rateUsd}
                digits={20}
              />
              <LocalizedPrice
                className='text-md font-semibold'
                priceUSD={walletCoin || 0} cryptocurrency={coinSymbol}
                digits={20}
              />
            </div>
          )}
        </Media>

        <div className="interval-container text-md font-semibold col-span-2">
          <em>Set up recurring</em>
          <Dropdown
            titleClassName="interval-dopdown text-purple"
            options={options}
            onSelect={setPaymentInterval}
            title={<span>{intervalToTextMapping[paymentInterval]}</span>}
          />
          <em>payments</em>
        </div>

        <div className="btns-container col-span-2">
          <ButtonPurpleL onClick={onClose}>Confirm</ButtonPurpleL>
          <button className="cancel-btn pointer opacity-50" onClick={onClose}>Cancel</button>
        </div>
      </section>
    </div>
  );
};

RecurringPaymentsModal.propTypes = {
  coinAmount: PropTypes.number.isRequired,
  fiatAmount: PropTypes.number.isRequired,
  type: PropTypes.oneOf(Object.values(transactionTypes)),
  onClose: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default RecurringPaymentsModal;
