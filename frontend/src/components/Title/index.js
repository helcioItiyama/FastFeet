import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

function Title({ title, onHandleBack }) {
  return (
    <Container>
      <h2>{title}</h2>

      <div>
        <button onClick={onHandleBack} type="button">
          Voltar
        </button>
        <button type="submit">Salvar</button>
      </div>
    </Container>
  );
}

export default Title;

Title.propTypes = {
  title: PropTypes.string.isRequired,
  onHandleBack: PropTypes.func.isRequired,
};
