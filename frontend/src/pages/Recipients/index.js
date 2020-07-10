/* eslint-disable prefer-const */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect, useRef } from 'react';
import history from '~/services/history';
import Form from '~/components/Form';
import Table from '~/components/Table';
import Options from '~/components/Options';
import { useOnClickOutside } from '~/utils/hooks';
import api from '~/services/api';

function Recipients() {
  const [recipients, setRecipients] = useState([]);
  const [search, setSearch] = useState('');
  const [chose, setChose] = useState('');
  const [visible, setVisible] = useState(false);

  const wrapperRef = useRef(); // ref to options modal

  async function loadRecipients() {
    const response = await api.get('recipients', {
      params: { q: search },
    });
    setRecipients(response.data);
  }

  useEffect(() => {
    loadRecipients();
  }, [search]);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleRegister = () => {
    history.push('/register/recipients');
  };

  useOnClickOutside(wrapperRef, () => {
    // close options modal by clicking outside it
    if (visible) {
      setVisible(false);
    }
  });

  const handleShowOptions = (id) => {
    setChose(id);
    setVisible(!visible);
  };

  const handleRemove = () => {
    loadRecipients();
  };

  return (
    <>
      <Form
        onHandleChange={handleSearch}
        onRegister={handleRegister}
        title="Gerenciando destinatários"
      />
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Endereço</th>
            <th>Acões</th>
          </tr>
        </thead>

        {recipients &&
          recipients.map((recipient) => {
            let {
              id,
              name,
              street,
              number,
              complement,
              state,
              city,
            } = recipient;

            complement ? (complement += ',') : (complement = '');
            return (
              <tbody key={id}>
                <tr>
                  <td>{id}</td>
                  <td>{name}</td>
                  <td>{`${street}, ${number}, ${complement} ${city} - ${state}`}</td>
                  <td>
                    <button type="button" onClick={() => handleShowOptions(id)}>
                      ...
                    </button>
                    <Options
                      onRef={wrapperRef}
                      visible={visible && chose === id}
                      edit="Editar"
                      remove="Excluir"
                      onHandleRemove={handleRemove}
                      pathName="recipients"
                      id={id}
                    />
                  </td>
                </tr>
              </tbody>
            );
          })}
      </Table>
    </>
  );
}

export default Recipients;
