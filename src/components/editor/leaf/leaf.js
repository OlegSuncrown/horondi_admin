import React from 'react';
import PropTypes from 'prop-types';

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

Leaf.propTypes = {
  attributes: PropTypes.shape({}).isRequired,
  children: PropTypes.shape({}).isRequired,
  leaf: PropTypes.shape({
    text: PropTypes.string.isRequired,
    bold: PropTypes.bool,
    code: PropTypes.bool,
    italic: PropTypes.bool,
    underline: PropTypes.bool
  }).isRequired
};

export default Leaf;
