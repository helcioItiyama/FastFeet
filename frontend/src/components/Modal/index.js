/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './styles';

function Modal({ visible, children }) {
  return (
    <Container visible={visible}>
      <div>{children}</div>
    </Container>
  );
}

export default Modal;

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  visible: PropTypes.bool.isRequired,
};
