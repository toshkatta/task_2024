import { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import RCDropdown from 'rc-dropdown';
import Menu, { Item as MenuItem } from 'rc-menu';

import { ButtonGreyS } from '../Button';

import 'rc-dropdown/assets/index.css';
import './styles.scss';

const Dropdown = ({
  options,
  onSelect,
  title,
  className,
  menuClassName,
  titleClassName,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSelect = (e) => {
    onSelect(e.key);
    setIsDropdownOpen(false);
  };

  const menuClasses = classNames({
    'dropdown-menu': true,
    [menuClassName]: !!menuClassName,
  });

  const titleClasses = classNames({
    'dropdown-title': true,
    pointer: true,
    [titleClassName]: !!titleClassName,
  });

  const menuCallback = () => (
    <Menu onSelect={handleSelect} className={menuClasses}>
      {
        options.map((o) => (
          <MenuItem
            key={o.id}
            className="dropdown-option font-medium pointer"
          >
            {o.element}
          </MenuItem>
        ))
      }
    </Menu>
  );

  const dropdownIconClasses = classNames({
    fas: true,
    'fa-chevron-down': true,
    'is-rotated': isDropdownOpen,
  });

  return (
    <div className={className}>
      <RCDropdown
        trigger={['click']}
        overlay={menuCallback}
        animation="slide-up"
        onVisibleChange={setIsDropdownOpen}
      >
        <div className={titleClasses}>
          {title}
          <ButtonGreyS>
            <i className={dropdownIconClasses} />
          </ButtonGreyS>
        </div>
      </RCDropdown>
    </div>
  );
}

Dropdown.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      element: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
        PropTypes.array,
      ]),
    })
  ).isRequired,
  onSelect: PropTypes.func.isRequired,
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.array,
  ]).isRequired,
  className: PropTypes.string,
  menuClassName: PropTypes.string,
  titleClassName: PropTypes.string,
};

export default Dropdown;