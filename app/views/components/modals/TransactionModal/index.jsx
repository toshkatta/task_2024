import { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import Media from 'react-media';

import { transactionTypes } from '@/domain/Transactions';

import { transactionRequested } from '@/store/wallet/actions';

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

import './styles.scss';

const TransactionModal = ({
  coinAmount,
  fiatAmount,
  type,
  onClose,
  className,
}) => {
  const dispatch = useDispatch();

  const coinID     = useSelector(selectCoinID);
  const coinSymbol = useSelector(selectCoinSymbol);
  const rate       = useSelector(selectSelectedRate);
  const walletUSD  = useSelector(selectWalletUSDAmount);
  const walletCoin = useSelector(selectWalletCoinAmount(coinID));

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
  const usdAmount = fiatAmount * rate.rateUsd;

  const walletFiatAfterTransaction = isBuying
    ? (walletUSD - usdAmount) / rate.rateUsd
    : (walletUSD + usdAmount) / rate.rateUsd;

  const walletCryptoAfterTransaction = isBuying
    ? walletCoin || 0 + coinAmount
    : walletCoin - coinAmount;

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

  const confirmTransaction = () => {
    dispatch(transactionRequested({
      coinID,
      type,
      usdAmount,
      coinAmount,
    }));

    onClose();
  };

  const classes = classNames({
    'transaction-modal': true,
    [className]: !!className,
  });

  return (
    <div className="transaction-modal-overlay">
      <section className={classes}>
        <i onClick={onClose} className="close-icon fas fa-times text-sm pointer opacity-50" />

        <h6 className="text-xl font-semibold col-span-2 self-center">Transaction details:</h6>

        <span className='col-span-2 font-medium self-center'>Type: Single purchase</span>

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

        <Media query="(min-width: 600px)">
          {(matchesQuery) => (
            <div className={`amount-container ${matchesQuery ? '' : 'col-span-2'}`}>
              <span>Balance after transaction:</span>
              <LocalizedPrice
                className='text-md font-semibold'
                priceUSD={walletFiatAfterTransaction}
                digits={20}
              />
              <LocalizedPrice
                className='text-md font-semibold'
                priceUSD={walletCryptoAfterTransaction}
                cryptocurrency={coinSymbol}
                digits={20}
              />
            </div>
          )}
        </Media>

        <div className="btns-container col-span-2">
          <ButtonPurpleL onClick={confirmTransaction}>Confirm</ButtonPurpleL>
          <button className="cancel-btn pointer opacity-50" onClick={onClose}>Cancel</button>
        </div>
      </section>
    </div>
  );
};

TransactionModal.propTypes = {
  coinAmount: PropTypes.number.isRequired,
  fiatAmount: PropTypes.number.isRequired,
  type: PropTypes.oneOf(Object.values(transactionTypes)),
  onClose: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default TransactionModal;
