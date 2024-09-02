import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import { arrayToById } from '@/domain/Parsing';
import { coinListTypes } from '@/domain/Coins';

import CoinPrices from '@/views/pages/CoinDetails/components/CoinPrices';

import { getDefaultCoin } from '../defaults/Coin';
import { getDefaultRate } from '../defaults/Rate';

const mockStore = configureStore([]);

const setup = (coins) => {
  const rates = [
    getDefaultRate(),
    getDefaultRate(),
    getDefaultRate(),
  ];

  const store = mockStore({
    coins: {
      byID: arrayToById(coins),
      allIDs: coins.map((c) => c.id),
      listType: coinListTypes.ALL,
    },
    rates: {
      byID: arrayToById(rates),
      allIDs: rates.map((r) => r.id),
      selectedID: rates[0].id,
    },
  });

  render(
    <Provider store={store}>
      <BrowserRouter>
        <CoinPrices />
      </BrowserRouter>
    </Provider>
  );
};

Element.prototype.scrollTo = () => null;

describe('Coin prices', () => {
  it('should render an empty list when there are no coins', () => {
    setup([]);
    expect(() => getByRole('listitem')).toThrow();
  });
  it('should render a message when there are no coins', () => {
    setup([]);
    const regex = new RegExp(/no coins/i);
    const message = screen.getByText(regex);
    expect(message).toBeInTheDocument();
    expect(message).toBeVisible();
  });
  it('should render the correct number of coins', () => {
    const coins = [
      getDefaultCoin(),
      getDefaultCoin(),
      getDefaultCoin(),
      getDefaultCoin(),
      getDefaultCoin(),
    ];
    setup(coins);

    const allCoins = screen.getAllByRole('listitem');
    expect(allCoins).toHaveLength(coins.length);
  });
});
