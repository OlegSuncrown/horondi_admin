import React from 'react';
import PropTypes from 'prop-types';

const Element = ({ attributes, children, element }) => {
  switch (element.type) {
  case 'block-quote':
    return <blockquote {...attributes}>{children}</blockquote>;
  case 'bulleted-list':
    return <ul {...attributes}>{children}</ul>;
  case 'heading-one':
    return <h1 {...attributes}>{children}</h1>;
  case 'heading-two':
    return <h2 {...attributes}>{children}</h2>;
  case 'list-item':
    return <li {...attributes}>{children}</li>;
  case 'numbered-list':
    return <ol {...attributes}>{children}</ol>;
  default:
    return <p {...attributes}>{children}</p>;
  }
};

Element.propTypes = {
  attributes: PropTypes.shape({}).isRequired,
  element: PropTypes.shape({
    children: PropTypes.arrayOf(PropTypes.shape({})),
    type: PropTypes.string.isRequired
  }).isRequired,
  children: PropTypes.shape({}).isRequired
};

export default Element;
