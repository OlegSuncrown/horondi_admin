import React from 'react';
import { cx, css } from 'emotion';
import PropTypes from 'prop-types';
import Menu from '../menu';

const Toolbar = React.forwardRef(({ className, ...props }, ref) => (
  <Menu
    {...props}
    ref={ref}
    className={cx(
      className,
      css`
          position: relative;
          padding: 15px 5px;
          border-bottom: 2px solid #eee;
          border-top: 2px solid #eee;
          margin-bottom: 20px;
          display: flex;
          justify-content: space-around;
}
        `
    )}
  />
));

Toolbar.propTypes = {
  className: PropTypes.string
};

Toolbar.defaultProps = {
  className: ''
};

export default Toolbar;
