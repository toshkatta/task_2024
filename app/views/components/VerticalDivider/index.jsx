import classNames from 'classnames';
import PropTypes from 'prop-types';

import './styles.scss';

const VerticalDivider = ({
  className = '',
  block = false,
}) => {
  const classes = classNames({
    [className]: !!className,
    'vertical-divider': true,
    'block': block,
  });

  return (
    <i className={classes} />
  );
};

VerticalDivider.propTypes = {
  className: PropTypes.string,
  block: PropTypes.bool,
};

export default VerticalDivider;
