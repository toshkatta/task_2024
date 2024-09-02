import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  defaultLocale,
  formatPercent,
} from '@/domain/Localization';

import './styles.scss';

const ChangePercent = ({
  percent,
  locale = defaultLocale,
  className = '',
  compact = false,
}) => {
  const formatted = formatPercent({ percent, compact, locale });
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
    <b className={classes}>{ isPositive && '+' }{formatted}</b>
  );
};

ChangePercent.propTypes = {
  percent: PropTypes.number.isRequired,
  locale: PropTypes.string,
  className: PropTypes.string,
  compact: PropTypes.bool,
};

export default ChangePercent;
