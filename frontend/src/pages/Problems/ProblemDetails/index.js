/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import Modal from '~/components/Modal';

import { Container } from './styles';

function ProblemDetails({ modal, onRef, details }) {
  return (
    <Modal visible={modal}>
      <Container ref={onRef}>
        <div>
          <h3>Visualizar Problema</h3>
          <p>{details.description}</p>
        </div>
      </Container>
    </Modal>
  );
}

export default ProblemDetails;

ProblemDetails.propTypes = {
  details: PropTypes.object.isRequired,
  modal: PropTypes.bool.isRequired,
  onRef: PropTypes.object.isRequired,
};
