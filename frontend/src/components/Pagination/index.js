import React from 'react';
import PropTypes from 'prop-types';
import { paginate } from '~/utils/pages';

import { Container, Pages } from './styles';

function Pagination({ onHandleClick, page, totalPages }) {
  const pages = paginate(page, totalPages);

  return (
    <Container>
      <button type="button" onClick={() => onHandleClick('decrement')}>
        anterior
      </button>

      <div>
        {pages.map((eachPage) => (
          <Pages key={eachPage} actualPage={eachPage === page}>
            {eachPage}
          </Pages>
        ))}
      </div>
      <button type="button" onClick={() => onHandleClick('increment')}>
        próxima
      </button>
    </Container>
  );
}

export default Pagination;

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onHandleClick: PropTypes.func.isRequired,
};
