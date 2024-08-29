import PropTypes from 'prop-types';
import classNames from 'classnames';

import { defaultLocale } from '@/domain/Locale';

import './styles.scss';

const ChangePercent = ({
  percent,
  locale = defaultLocale,
  className = '',
}) => {
  const formatted = (percent / 100).toLocaleString(locale, {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  const isPositive = percent > 0;

  const classes = classNames({
    [className]: !!className,
    'change-percent': true,
    'text-base': true,
    'font-bold': true,
    'positive': isPositive,
    'negative': !isPositive,
  });

  return (
    <b className={classes}>
      { isPositive ? '+' : '-' }
      {formatted}
    </b>
  );
};

ChangePercent.propTypes = {
  percent: PropTypes.number.isRequired,
  locale: PropTypes.string,
  className: PropTypes.string,
};

export default ChangePercent;
