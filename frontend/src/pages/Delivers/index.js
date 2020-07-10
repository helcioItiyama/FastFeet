import React, { useState, useEffect, useRef } from 'react';
import api from '~/services/api';
import history from '~/services/history';
import { useOnClickOutside } from '~/utils/hooks';
import Form from '~/components/Form';
import Table from '~/components/Table';
import Options from '~/components/Options';

function Delivers() {
  const [delivermen, setDelivermen] = useState([]);
  const [search, setSearch] = useState('');
  const [chose, setChose] = useState('');
  const [visible, setVisible] = useState(false);

  const wrapperRef = useRef();

  async function loadDelivermen() {
    const response = await api.get('delivers', {
      params: { q: search },
    });
    setDelivermen(response.data);
  }

  useEffect(() => {
    loadDelivermen();
  }, [search]);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleRegister = () => {
    history.push('/register/delivers');
  };

  useOnClickOutside(wrapperRef, () => {
    if (visible) {
      setVisible(false);
    }
  });

  const handleShowOptions = (id) => {
    setChose(id);
    setVisible(!visible);
  };

  const handleRemove = () => {
    loadDelivermen();
  };

  return (
    <>
      <Form
        onHandleChange={handleSearch}
        onRegister={handleRegister}
        title="Gerenciando entregadores"
      />
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Foto</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Acões</th>
          </tr>
        </thead>

        {delivermen &&
          delivermen.map((deliverman) => {
            const { id, name, email, avatar } = deliverman;
            return (
              <tbody key={id}>
                <tr>
                  <td>{id}</td>
                  <td>
                    <img
                      src={
                        avatar
                          ? avatar.url
                          : 'https://api.adorable.io/avatars/50/abott@adorable.png'
                      }
                      alt={name}
                    />
                  </td>
                  <td>{name}</td>
                  <td>{email}</td>
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
                      pathName="delivers"
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

export default Delivers;
