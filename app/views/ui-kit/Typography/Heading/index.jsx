import PropTypes from 'prop-types';
import classNames from 'classnames';

import './styles.scss';

const sizeToClassnameMapping = {
  'h1': 'text-3xl',
  'h2': 'text-2xl',
  'h3': 'text-xl',
  'h4': 'text-lg',
};

const Heading = ({
  size,
  className,
  children,
}) => {
  const HeadingTag = size;

  const classes = classNames({
    [sizeToClassnameMapping[size]]: true,
    [className]: !!className,
  });

  return (
    <HeadingTag className={classes}>{children}</HeadingTag>
  );
}

Heading.propTypes = {
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

export default Heading;
