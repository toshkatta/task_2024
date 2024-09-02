import { Scrollbars } from 'react-custom-scrollbars';
import PropTypes from 'prop-types';

const CustomScrollbar = ({ children }) => {
  const scrollBarsAttr = {
    autoHide: true,
  };

  return (
    <Scrollbars {...scrollBarsAttr}>
      {children}
    </Scrollbars>
  );
};

CustomScrollbar.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.array,
  ]).isRequired,
};

export default CustomScrollbar;
