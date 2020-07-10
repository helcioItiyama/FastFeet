import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

function Table({ children }) {
  return <Container>{children}</Container>;
}

export default Table;

Table.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array])
    .isRequired,
};
