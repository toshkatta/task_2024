import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  BTN_COLORS,
  BTN_SIZES,
  BTN_TYPES,

} from './constants';

import './styles.scss';

const Button = ({
  onClick,
  id,
  title,
  className,
  size,
  color,
  disabled = false,
  type = BTN_TYPES.BUTTON,
  children,
}) => {

  const handleClick = (e) => {
    e.target.blur();

    if (typeof onClick === 'function') onClick(e);
  };

  const buttonClasses = classNames({
    [className]: className !== undefined,
    'btn': true,
    'font-semibold': true,
    [`btn-size-${size}`]: true,
    [`btn-color-${color}`]: true,
    'btn-is-disabled': disabled,
  });

  const button = (
    <button
      id={id}
      type={type}
      title={title}
      className={buttonClasses}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </button>
  );

  return button;
}

Button.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  title: PropTypes.string,
  type: PropTypes.oneOf(Object.values(BTN_TYPES)),
  size: PropTypes.oneOf(Object.values(BTN_SIZES)).isRequired,
  color: PropTypes.oneOf(Object.values(BTN_COLORS)).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.array,
  ]).isRequired,
};

/* eslint-disable react/prop-types */
// eslint-disable-next-line react/display-name
const withSizeAndColor = (size, color) => ({ children, ...props }) => (
  <Button {...props} size={size} color={color}>
    { children }
  </Button>
);

const ButtonGreyL = withSizeAndColor(BTN_SIZES.LARGE, BTN_COLORS.GREY);
const ButtonGreyS = withSizeAndColor(BTN_SIZES.SMALL, BTN_COLORS.GREY);

const ButtonPurpleL = withSizeAndColor(BTN_SIZES.LARGE, BTN_COLORS.PURPLE);
const ButtonPurpleS = withSizeAndColor(BTN_SIZES.SMALL, BTN_COLORS.PURPLE);

export default Button;

export {
  ButtonGreyL,
  ButtonGreyS,

  ButtonPurpleL,
  ButtonPurpleS,
};
