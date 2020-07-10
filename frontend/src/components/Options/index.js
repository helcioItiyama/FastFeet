/* eslint-disable no-restricted-globals */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { FaEye } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import { RiDeleteBinLine } from 'react-icons/ri';
import PropTypes from 'prop-types';
import history from '~/services/history';
import { Container } from './styles';
import api from '~/services/api';

function Options({
  visible,
  onRef,
  check,
  edit,
  remove,
  id,
  pathName,
  onHandleRemove,
}) {
  const handleOptions = async (type) => {
    switch (type) {
      case 'check':
        history.push('/');
        break;
      case 'edit':
        history.push(`/edit/${pathName}/${id}`);
        break;
      case 'remove':
        // eslint-disable-next-line no-alert
        if (confirm('Deseja excluir destinatário?')) {
          await api.delete(`/${pathName}/${id}`);
          onHandleRemove();
        }
        break;
      default:
        break;
    }
  };

  return (
    <Container ref={onRef} visible={visible}>
      {check && (
        <div>
          <FaEye color="#006400" />
          <button onClick={() => handleOptions('check')} type="button">
            {check}
          </button>
        </div>
      )}
      <div>
        <MdEdit color="#3c40c6" />
        <button onClick={() => handleOptions('edit')} type="button">
          {edit}
        </button>
      </div>
      <div>
        <RiDeleteBinLine color="#ff3f34" />
        <button onClick={() => handleOptions('remove')} type="button">
          {remove}
        </button>
      </div>
    </Container>
  );
}

export default Options;

Options.defaultProps = {
  check: null,
};

Options.propTypes = {
  visible: PropTypes.bool.isRequired,
  onRef: PropTypes.object.isRequired,
  check: PropTypes.string,
  edit: PropTypes.string.isRequired,
  remove: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  pathName: PropTypes.string.isRequired,
  onHandleRemove: PropTypes.func.isRequired,
};
