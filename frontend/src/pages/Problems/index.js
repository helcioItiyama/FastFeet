/* eslint-disable camelcase */
import React, { useState, useEffect, useRef } from 'react';
import api from '~/services/api';
import Table from '~/components/Table';
import Pagination from '~/components/Pagination';
import ProblemDetails from './ProblemDetails';
import Options from '~/components/Options';
import { useOnClickOutside } from '~/utils/hooks';
import { Container, Description } from './styles';

function Problems() {
  const modalRef = useRef();
  const wrapperRef = useRef();
  const [problems, setProblems] = useState([]);
  const [page, setPage] = useState(1);
  const [chose, setChose] = useState('');
  const [visible, setVisible] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [choseModal, setChoseModal] = useState('');

  async function loadProblems() {
    const response = await api.get(`delivery/problems`, {
      params: { page },
    });
    setProblems(response.data);
  }

  useEffect(() => {
    loadProblems();
  }, [page]);

  const handleChangePage = (button) => {
    if (button === 'decrement') {
      if (page <= 1) return;
      setPage(page - 1);
    } else if (button === 'increment') {
      if (problems.length < 6) return;
      setPage(page + 1);
    }
  };

  useOnClickOutside(modalRef, () => {
    if (isModal) {
      setIsModal(false);
    }
  });

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
    loadProblems();
  };

  const handleCheck = (id) => {
    setChoseModal(id);
    setIsModal(!isModal);
  };

  return (
    <Container>
      <header>
        <h2>Problemas na Entrega</h2>
      </header>
      <Table>
        <thead>
          <tr>
            <th>Encomenda</th>
            <th>Problema</th>
            <th>Acões</th>
          </tr>
        </thead>

        {problems &&
          problems.map((problem) => {
            const { id, description } = problem;
            return (
              <tbody key={id}>
                <tr>
                  <td>{id}</td>
                  <td>
                    <Description>{description}</Description>
                  </td>
                  <td>
                    <ProblemDetails
                      onRef={modalRef}
                      modal={isModal && choseModal === id}
                      details={problem}
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
                      remove="Cancelar encomenda"
                      onHandleRemove={handleRemove}
                      onHandleCheck={handleCheck}
                      pathName="problem"
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
        content={problems}
      />
    </Container>
  );
}

export default Problems;
