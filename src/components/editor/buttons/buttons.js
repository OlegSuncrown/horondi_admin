import React from 'react';
import { cx, css } from 'emotion';
import { useSlate } from 'slate-react';
import PropTypes from 'prop-types';
import useEditorOperations from '../../../utils/use-editor-operations';

const {
  isBlockActive,
  toggleBlock,
  isMarkActive,
  toggleMark
} = useEditorOperations();

const Button = React.forwardRef(
  ({ className, active, reversed, ...props }, ref) => (
    <span
      {...props}
      ref={ref}
      className={cx(
        className,
        css`
          cursor: pointer;
          color: ${reversed
      ? active
        ? 'white'
        : '#aaa'
      : active
        ? 'black'
        : '#ccc'};
        `
      )}
    />
  )
);

const Icon = React.forwardRef(({ className, ...props }, ref) => (
  <span
    {...props}
    ref={ref}
    className={cx(
      'material-icons',
      className,
      css`
        font-size: 18px;
        vertical-align: text-bottom;
      `
    )}
  />
));

const BlockButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <Button
      active={isBlockActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  );
};

const MarkButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <Button
      active={isMarkActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  active: PropTypes.bool.isRequired,
  reversed: PropTypes.bool
};

Icon.propTypes = {
  className: PropTypes.string
};

MarkButton.propTypes = {
  format: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
};

BlockButton.propTypes = {
  format: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
};

Button.defaultProps = {
  className: '',
  reversed: true
};

Icon.defaultProps = {
  className: ''
};

export { MarkButton, BlockButton };
