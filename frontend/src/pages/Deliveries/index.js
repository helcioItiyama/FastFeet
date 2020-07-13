/* eslint-disable camelcase */
import React, { useState, useEffect, useRef } from 'react';
import { isAfter, parseISO, format } from 'date-fns';
import api from '~/services/api';
import history from '~/services/history';
import Form from '~/components/Form';
import Table from '~/components/Table';
import Options from '~/components/Options';
import Pagination from '~/components/Pagination';
import DeliveriesDetails from './DeliveriesDetails';
import { useOnClickOutside } from '~/utils/hooks';
import { Figure } from './styles';

function Deliveries() {
  const [deliveries, setDeliveries] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [search, setSearch] = useState('');
  const [chose, setChose] = useState('');
  const [problems, setProblems] = useState([]);
  const [visible, setVisible] = useState(false);
  const [choseModal, setChoseModal] = useState('');
  const [isModal, setIsModal] = useState(false);

  const wrapperRef = useRef();
  const modalRef = useRef();

  async function loadDeliveries() {
    const { data } = await api.get('delivery', {
      params: { page, q: search },
    });

    setTotalPages(Math.ceil(data.count / 6));

    const deliveryDetails = await data.deliveries.map((delivery) => {
      // eslint-disable-next-line prefer-const
      let { canceled_at, start_date, end_date } = delivery;

      const isFetched = isAfter(new Date(), parseISO(start_date));
      let status = '';

      if (canceled_at === null && isFetched && end_date === null) {
        status = 'retirada';
      } else if (canceled_at === null && end_date) {
        status = 'entregue';
      } else if (canceled_at) {
        status = 'cancelada';
      } else {
        status = 'pendente';
      }

      start_date = start_date && format(parseISO(start_date), 'dd/MM/yyyy');
      end_date = end_date && format(parseISO(end_date), 'dd/MM/yyyy');
      return { ...delivery, status, start_date, end_date };
    });
    setDeliveries(deliveryDetails);
  }

  useEffect(() => {
    async function loadProblems() {
      const { data } = await api.get('/delivery/problems');
      setProblems(data.deliveries);
    }
    loadProblems();
  }, []);

  useEffect(() => {
    loadDeliveries();
  }, [page, search]);

  const handleChangePage = (button) => {
    if (button === 'decrement') {
      if (page <= 1) return;
      setPage(page - 1);
    } else if (button === 'increment') {
      if (deliveries.length < 6) return;
      setPage(page + 1);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    setSearch(event.target.value);
  };

  const handleRegister = () => {
    history.push('/register/delivery');
  };

  useOnClickOutside(wrapperRef, () => visible && setVisible(false));

  useOnClickOutside(modalRef, () => isModal && setIsModal(false));

  const handleShowOptions = (id) => {
    setChose(id);
    setVisible(!visible);
  };

  const handleRemove = () => {
    loadDeliveries();
  };

  const handleCheck = (id) => {
    setChoseModal(id);
    setIsModal(!isModal);
  };

  return (
    <div>
      <Form
        onHandleChange={handleSearch}
        onRegister={handleRegister}
        title="Gerenciando encomendas"
      />
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Produto</th>
            <th>Entregador</th>
            <th>Destinatário</th>
            <th>Cidade</th>
            <th>Estado</th>
            <th>Status</th>
            <th>Acões</th>
          </tr>
        </thead>

        {deliveries &&
          deliveries.map((delivery) => {
            const { id, product, recipient, deliverman, status } = delivery;

            return (
              <tbody key={id}>
                <tr>
                  <td>{id}</td>
                  <td>{product}</td>
                  <td>{deliverman?.name}</td>
                  <td>{recipient?.name}</td>
                  <td>{recipient?.city}</td>
                  <td>{recipient?.state}</td>
                  <td>
                    <Figure color={status}>
                      <span color={status} />
                      {status}
                    </Figure>
                  </td>
                  <td>
                    <DeliveriesDetails
                      onRef={modalRef}
                      modal={isModal && choseModal === id}
                      details={delivery}
                      problems={problems}
                    />
                  </td>
                  <td>
                    <button type="button" onClick={() => handleShowOptions(id)}>
                      ...
                    </button>
                    <Options
                      onRef={wrapperRef}
                      visible={visible && chose === id}
                      check="Visualizar"
                      edit="Editar"
                      remove="Excluir"
                      onHandleRemove={handleRemove}
                      onHandleCheck={handleCheck}
                      type="encomenda"
                      pathName="delivery"
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
    </div>
  );
}

export default Deliveries;
