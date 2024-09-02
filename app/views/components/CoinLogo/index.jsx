import PropTypes from 'prop-types';
import classNames from 'classnames';

import './styles.scss';

const brokenImages = [
  'polkadot',
  'bigtet-token',
];

const CoinLogo = ({
  id,
  coinName,
  className,
}) => {
  const onImageError = ({ currentTarget }) => {
    const lowercaseID = id.toLowerCase();
    const imageID = brokenImages.includes(lowercaseID)
      ? `${lowercaseID}-new`
      : lowercaseID;

    currentTarget.src=`https://cryptologos.cc/logos/thumbs/${imageID}.png`;
    currentTarget.onError = null;
  };

  const classes = classNames({
    'coin-logo': true,
    [className]: !!className,
  });

  return (
    <img
      className={classes}
      src={`https://cryptologos.cc/logos/thumbs/${coinName.toLowerCase()}.png`}
      onError={onImageError}
      alt={coinName}
    />
  );
};

CoinLogo.propTypes = {
  id: PropTypes.string.isRequired,
  coinName: PropTypes.string.isRequired,
  className: PropTypes.string,
  imageClassName: PropTypes.string,
};

export default CoinLogo;
