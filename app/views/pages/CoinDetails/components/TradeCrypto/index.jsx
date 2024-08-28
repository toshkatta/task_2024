import { useState } from 'react';

import { ButtonPurpleL } from 'ui-kit/Button';
import { CurrencyInput } from 'ui-kit/CurrencyInput';

import './styles.scss';

const TradeCrypto = () => {
  const [fiatAmount, setFiatAmount] = useState('');

  return(
    <section className="trade-crypto">
      <div className="trade-btns">
        <button>Buy BTC</button>
        <button>Sell BTC</button>
      </div>

      <div className="trade-inputs">
        <CurrencyInput
          name="fiat-input"
          label="You will pay"
          placeholder="0.00"
          value={fiatAmount}
          onChange={setFiatAmount}
        />

        {/* <CurrencyInput
          name="crypto-input"
          label="You will receive"
          placeholder="0.00"
        /> */}
      </div>

      <ButtonPurpleL>Buy BTC</ButtonPurpleL>
    </section>
  );
};

export default TradeCrypto;
