import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Media from 'react-media';

import { selectCoinById } from '@/store/coins/selectors';

import { coinToggled } from '@/store/coins/actions';

import ChangePercent from '@/views/components/ChangePercent';
import LocalizedPrice from '@/views/components/LocalizedPrice';
import CoinLogo from '@/views/components/CoinLogo';
import WishlistIcon from '@/views/components/WishlistIcon';

import routes from '@/routes';

import './styles.scss';

const CoinListItem = ({
  id,
  className,
}) => {
  const dispatch = useDispatch();

  const coin = useSelector(selectCoinById(id));

  if (!coin) return null;

  const onWatchlistClick = (e) => {
    e.preventDefault();
    dispatch(coinToggled(id));
  };

  const classes = classNames({
    'coin-list-item': true,
    'text-black': true,
    [className]: !!className,
  });

  return (
    <Link to={routes.getCoinPage(id)} className={classes}>
      <Media query="(min-width: 770px)">
        <span className="self-center row-span-2 text-sm font-semibold">#{coin.rank}</span>
      </Media>

      <CoinLogo id={id} coinName={coin.name} className="self-center row-span-2" />

      <Media query="(min-width: 550px)">
        <span className="coin-name font-semibold">{coin.name}</span>
      </Media>
      <span className="coin-symbol font-semibold opacity-50">{coin.symbol.toUpperCase()}</span>

      <ChangePercent
        percent={coin.changePercent24Hr}
        className="self-center font-semibold text-md row-span-2 "
      />

      <LocalizedPrice
        priceUSD={coin.priceUsd}
        digits={8}
        className="font-semibold text-md row-span-2 "
      />

      <Media query="(min-width: 1300px)">
        <LocalizedPrice
          compact
          priceUSD={coin.supply}
          cryptocurrency={coin.symbol}
          className="font-semibold text-md row-span-2"
        />
      </Media>

      <Media query="(min-width: 460px)">
        <LocalizedPrice
          compact
          priceUSD={coin.marketCapUsd}
          className="font-semibold text-md row-span-2"
        />
      </Media>

      <Media query="(min-width: 770px)">
        <LocalizedPrice
          compact
          priceUSD={coin.volumeUsd24Hr}
          className="font-semibold text-md row-span-2"
        />
      </Media>

      <Media query="(min-width: 390px)">
        <WishlistIcon
          id={id}
          className="self-center row-span-2 text-lg"
          onClick={onWatchlistClick}
        />
      </Media>
    </Link>
  );
};

CoinListItem.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default CoinListItem;
