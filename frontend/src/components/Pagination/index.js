import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

function Pagination({ onHandleClick }) {
  return (
    <Container>
      <button type="button" onClick={() => onHandleClick('decrement')}>
        anterior
      </button>
      <button type="button" onClick={() => onHandleClick('increment')}>
        próxima
      </button>
    </Container>
  );
}

export default Pagination;

Pagination.propTypes = {
  onHandleClick: PropTypes.func.isRequired,
};
