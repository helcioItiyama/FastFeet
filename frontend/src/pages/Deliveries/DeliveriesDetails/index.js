/* eslint-disable react/forbid-prop-types */
/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import Modal from '~/components/Modal';

import { Container, Signature } from './styles';

function DeliveriesDetails({ problems, onRef, modal, details }) {
  const {
    id,
    canceled_at,
    start_date,
    end_date,
    recipient,
    signature,
    signature_id,
  } = details;
  const { street, number, city, state, zip_code } = recipient;
  let problemDetails;
  if (canceled_at) {
    problemDetails = problems.find((problem) => problem.delivery_id === id);
  }

  return (
    <Modal visible={modal}>
      <Container ref={onRef}>
        <div>
          <h3>Informações da encomenda</h3>
          <p>{`${street}, ${number}`}</p>
          <p>{`${city} - ${state}`}</p>
          <p>{zip_code}</p>
        </div>

        <div>
          <h3>Datas</h3>
          <p>
            <span>Retirada:</span>
            {start_date || 'Ainda não agendado'}
          </p>
          <p>
            <span>Entrega:</span>
            {end_date || 'Ainda não entregue'}
          </p>
        </div>

        {canceled_at ? (
          <div>
            <h3>Motivo de cancelamento</h3>
            <p>{problemDetails?.description}</p>
          </div>
        ) : (
          <div>
            <h3>Assinatura do destinatário</h3>
            {signature_id ? (
              <Signature src={signature.url} alt="assinatura" />
            ) : (
              <p>Ainda não coletada</p>
            )}
          </div>
        )}
      </Container>
    </Modal>
  );
}

export default DeliveriesDetails;

DeliveriesDetails.propTypes = {
  details: PropTypes.object.isRequired,
  modal: PropTypes.bool.isRequired,
  onRef: PropTypes.object.isRequired,
  problems: PropTypes.array.isRequired,
};
