import { useSelector } from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { selectIsCoinWatchlisted } from '@/store/coins/selectors';

import './styles.scss';

const WishlistIcon = ({
  id,
  className,
  onClick = () => null,
}) => {
  const isWatchlisted = useSelector(selectIsCoinWatchlisted(id));

  const classes = classNames({
    'watchlist-icon': true,
    'fa-star': true,
    fas: isWatchlisted,
    'text-purple': isWatchlisted,
    far: !isWatchlisted,
    'text-black': !isWatchlisted,
    'is-watchlisted': isWatchlisted,
    [className]: !!className,
  });

  return <i className={classes} onClick={onClick} />
};

WishlistIcon.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default WishlistIcon;
