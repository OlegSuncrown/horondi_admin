import React from 'react';
import { cx, css } from 'emotion';
import PropTypes from 'prop-types';

const Menu = React.forwardRef(({ className, ...props }, ref) => (
  <div
    {...props}
    ref={ref}
    className={cx(
      className,
      css`
        & > * {
          display: inline-block;
        }
        & > * + * {
          margin-left: 15px;
        }
      `
    )}
  />
));

Menu.propTypes = {
  className: PropTypes.string
};

Menu.defaultProps = {
  className: ''
};

export default Menu;
