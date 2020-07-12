/* eslint-disable no-unused-expressions */
/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { FaEye } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import { RiDeleteBinLine } from 'react-icons/ri';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
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
  onHandleCheck,
  onHandleRemove,
  type,
}) {
  const handleOptions = async (button) => {
    switch (button) {
      case 'check':
        onHandleCheck(id);
        break;
      case 'edit':
        history.push(`/edit/${pathName}/${id}`);
        break;
      case 'remove':
        try {
          if (confirm(`Deseja excluir ${type}?`)) {
            if (pathName === 'problem') {
              await api.delete(`${pathName}/${id}/cancel-delivery`);
              onHandleRemove();
              toast.success('problema excluído com sucesso');
              break;
            }

            await api.delete(`/${pathName}/${id}`);
            onHandleRemove();
            type === 'encomenda'
              ? toast.success(`${type} excluída com sucesso`)
              : toast.success(`${type} excluído com sucesso`);
          }
        } catch (err) {
          toast.error('Não foi possível fazer a exclusão');
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
      {edit && (
        <div>
          <MdEdit color="#3c40c6" />
          <button onClick={() => handleOptions('edit')} type="button">
            {edit}
          </button>
        </div>
      )}
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
  edit: null,
};

Options.propTypes = {
  type: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  onRef: PropTypes.object.isRequired,
  check: PropTypes.string,
  edit: PropTypes.string,
  remove: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  pathName: PropTypes.string.isRequired,
  onHandleCheck: PropTypes.func.isRequired,
  onHandleRemove: PropTypes.func.isRequired,
};
