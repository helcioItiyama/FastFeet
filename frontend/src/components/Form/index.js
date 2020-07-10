import React from 'react';
import PropTypes from 'prop-types';
import { GoSearch } from 'react-icons/go';

import { Container } from './styles';

function Form({ title, onHandleChange, onRegister }) {
  return (
    <Container>
      <form>
        <h2>{title}</h2>
        <div>
          <GoSearch
            style={{ position: 'absolute', top: '10px', left: '10px' }}
          />
          <input
            onChange={onHandleChange}
            type="text"
            placeholder="Buscar por encomenda"
          />
          <button onClick={onRegister} type="button">
            + Cadastrar
          </button>
        </div>
      </form>
    </Container>
  );
}

export default Form;

Form.propTypes = {
  title: PropTypes.string.isRequired,
  onHandleChange: PropTypes.func.isRequired,
  onRegister: PropTypes.func.isRequired,
};
