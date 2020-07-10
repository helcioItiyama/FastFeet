/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import Table from '~/components/Table';
import Pagination from '~/components/Pagination';
import api from '~/services/api';
import { Container } from './styles';

function Problems() {
  const [problems, setProblems] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function loadProblems() {
      const response = await api.get(`delivery/problems`, {
        params: { page },
      });
      setProblems(response.data);
    }

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

  return (
    <Container>
      <div>
        <h2>Problemas na Entrega</h2>
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
              const { delivery_id, description } = problem;
              return (
                <tbody key={delivery_id}>
                  <tr>
                    <td>{delivery_id}</td>
                    <td>{description}</td>
                    <td>...</td>
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
      </div>
    </Container>
  );
}

export default Problems;
