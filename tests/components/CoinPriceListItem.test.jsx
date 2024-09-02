import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import { arrayToById } from '@/domain/Parsing';
import {
  formatPercent,
  formatPrice,
} from '@/domain/Localization';

import CoinPriceListItem from '@/views/pages/CoinDetails/components/CoinPriceListItem';

import routes from '@/routes';

import { getDefaultCoin } from '../defaults/Coin';
import { getDefaultRate } from '../defaults/Rate';

const mockStore = configureStore([]);

describe('Coin list item', () => {
  let coin;
  let rates;

  beforeEach(() => {
    coin = getDefaultCoin();

    rates = [
      getDefaultRate(),
      getDefaultRate(),
      getDefaultRate(),
    ];

    const store = mockStore({
      coins: {
        byID: {
          [coin.id]: coin,
        },
        allIDs: [coin.id],
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
          <CoinPriceListItem id={coin.id} />
        </BrowserRouter>
      </Provider>
    );
  });

  it('should render a link to the coin page', () => {
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', routes.getCoinPage(coin.id));
    expect(link).toBeInTheDocument();
    expect(link).toBeVisible();
  });

  it("should render the coin's image", () => {
    const imageElement = screen.getByRole('img');
    expect(imageElement).toHaveAttribute('alt', coin.name);
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toBeVisible();
  });

  it("should render the coin's name", () => {
    const regex = new RegExp(coin.name, 'i');
    const nameElement = screen.getByText(regex);
    expect(nameElement).toBeInTheDocument();
    expect(nameElement).toBeVisible();
  });

  it("should render the coin's symbol", () => {
    const regex = new RegExp(coin.symbol, 'i');
    const symbolElement = screen.getByText(regex);
    expect(symbolElement).toBeInTheDocument();
    expect(symbolElement).toBeVisible();
  });

  it("should render the coin's price", () => {
    const priceByRate = coin.priceUsd / rates[0].rateUsd;
    const priceText = formatPrice({ price: priceByRate });
    const priceElement = screen.getByText(priceText);
    expect(priceElement).toBeInTheDocument();
    expect(priceElement).toBeVisible();
  });

  it("should render the coin's change percent", () => {
    const formatted = formatPercent({ percent: coin.changePercent24Hr });
    const percentText = coin.changePercent24Hr > 0
      ? `+${formatted}`
      : formatted;
    const percentElement = screen.getByText(percentText);
    expect(percentElement).toBeInTheDocument();
    expect(percentElement).toBeVisible();
  });
});
