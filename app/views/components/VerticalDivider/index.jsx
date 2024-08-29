import classNames from 'classnames';
import PropTypes from 'prop-types';

import './styles.scss';

const VerticalDivider = ({
  className = '',
}) => {
  const classes = classNames({
    [className]: !!className,
    'vertical-divider': true,
  });

  return (
    <i className={classes} />
  );
};

VerticalDivider.propTypes = {
  className: PropTypes.string,
};

export default VerticalDivider;
