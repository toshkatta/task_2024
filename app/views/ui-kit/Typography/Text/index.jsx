import PropTypes from 'prop-types';
import classNames from 'classnames';

import './styles.scss';

const sizeToClassnameMapping =  {
  'base': 'text-base',
  'sm': 'text-sm',
  'xs': 'text-xs',
};

const Text = ({
  size,
  className,
  children,
}) => {
  const classes = classNames({
    [sizeToClassnameMapping[size]]: true,
    [className]: !!className,
  });

  return (
    <span className={classes}>{children}</span>
  );
}

Text.propTypes = {
  size: PropTypes.oneOf(
    Object.keys(sizeToClassnameMapping)
  ).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.array,
  ]).isRequired,
  className: PropTypes.string,
};

export default Text;
