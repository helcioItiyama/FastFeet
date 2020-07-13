import React, { useState, useEffect, useRef } from 'react';
import api from '~/services/api';
import history from '~/services/history';
import { useOnClickOutside } from '~/utils/hooks';
import Form from '~/components/Form';
import Table from '~/components/Table';
import Pagination from '~/components/Pagination';
import Options from '~/components/Options';

function Delivers() {
  const [delivermen, setDelivermen] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [search, setSearch] = useState('');
  const [chose, setChose] = useState('');
  const [visible, setVisible] = useState(false);

  const wrapperRef = useRef();

  async function loadDelivermen() {
    const { data } = await api.get('delivers', {
      params: { q: search, page },
    });
    setDelivermen(data.delivers);
    setTotalPages(Math.ceil(data.count / 6));
  }

  useEffect(() => {
    loadDelivermen();
  }, [page, search]);

  const handleSearch = (event) => {
    event.preventDefault();
    setSearch(event.target.value);
  };

  const handleRegister = () => {
    history.push('/register/delivers');
  };

  useOnClickOutside(wrapperRef, () => visible && setVisible(false));

  const handleShowOptions = (id) => {
    setChose(id);
    setVisible(!visible);
  };

  const handleRemove = () => {
    loadDelivermen();
  };

  const handleChangePage = (button) => {
    if (button === 'decrement') {
      if (page <= 1) return;
      setPage(page - 1);
    } else if (button === 'increment') {
      if (delivermen.length < 6) return;
      setPage(page + 1);
    }
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
          delivermen.map(({ id, name, email, avatar }) => {
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
                      type="entregador"
                      pathName="delivers"
                      id={id}
                    />
                  </td>
                </tr>
              </tbody>
            );
          })}
      </Table>
      <Pagination
        onHandleClick={handleChangePage}
        page={page}
        totalPages={totalPages}
      />
    </>
  );
}

export default Delivers;
