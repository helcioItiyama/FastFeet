/* eslint-disable no-param-reassign */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect, useRef } from 'react';
import history from '~/services/history';
import Form from '~/components/Form';
import Table from '~/components/Table';
import Pagination from '~/components/Pagination';
import Options from '~/components/Options';
import { useOnClickOutside } from '~/utils/hooks';
import api from '~/services/api';

function Recipients() {
  const [recipients, setRecipients] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [search, setSearch] = useState('');
  const [chose, setChose] = useState('');
  const [visible, setVisible] = useState(false);

  const wrapperRef = useRef(); // ref to options modal

  async function loadRecipients() {
    const { data } = await api.get('recipients', {
      params: { q: search, page },
    });
    setRecipients(data.recipients);
    setTotalPages(Math.ceil(data.count / 6));
  }

  useEffect(() => {
    loadRecipients();
  }, [page, search]);

  const handleSearch = (event) => {
    event.preventDefault();
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

  const handleChangePage = (button) => {
    if (button === 'decrement') {
      if (page <= 1) return;
      setPage(page - 1);
    } else if (button === 'increment') {
      if (recipients.length < 6) return;
      setPage(page + 1);
    }
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
          recipients.map(
            ({ id, name, street, number, complement, state, city }) => {
              complement ? (complement += ',') : (complement = '');
              return (
                <tbody key={id}>
                  <tr>
                    <td>{id}</td>
                    <td>{name}</td>
                    <td>{`${street}, ${number}, ${complement} ${city} - ${state}`}</td>
                    <td>
                      <button
                        type="button"
                        onClick={() => handleShowOptions(id)}
                      >
                        ...
                      </button>
                      <Options
                        onRef={wrapperRef}
                        visible={visible && chose === id}
                        edit="Editar"
                        remove="Excluir"
                        type="destinatário"
                        onHandleRemove={handleRemove}
                        pathName="recipients"
                        id={id}
                      />
                    </td>
                  </tr>
                </tbody>
              );
            }
          )}
      </Table>
      <Pagination
        onHandleClick={handleChangePage}
        page={page}
        totalPages={totalPages}
      />
    </>
  );
}

export default Recipients;
