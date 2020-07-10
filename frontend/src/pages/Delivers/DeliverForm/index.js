/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Form, Input } from '@rocketseat/unform';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';
import history from '~/services/history';
import api from '~/services/api';
import Title from '~/components/Title';
import Wrapper from '~/components/InputWrapper';
import AvatarInput from '~/pages/Delivers/AvatarInput';

import { Container } from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('Preencha o nome do entregador'),
  email: Yup.string().email().required('Preencha o email do entregador'),
  avatar_id: Yup.string(),
});

function DeliverForm() {
  const { id } = useParams();

  const [deliverman, setDeliverman] = useState({});

  useEffect(() => {
    async function loadDeliverman() {
      const { data } = await api.get(`delivers/${id}`);
      setDeliverman(data);
    }
    if (id) {
      loadDeliverman();
    }
  }, []);

  const handleSubmit = async (data) => {
    // eslint-disable-next-line camelcase
    const { name, email, avatar_id } = data;
    try {
      if (id) {
        await api.put(`delivers/${id}`, {
          name,
          email,
          avatar_id,
        });
      } else {
        await api.post('delivers', {
          name,
          email,
          avatar_id,
        });
      }
      toast.success('Entregador cadastrado com sucesso');

      history.push('/delivers');
    } catch (error) {
      toast.error('Não foi possível cadastrar entregador');
    }
  };

  const handleBack = () => {
    history.push('/delivers');
  };

  return (
    <Container>
      <Form initialData={deliverman} onSubmit={handleSubmit} schema={schema}>
        <Title
          onHandleBack={handleBack}
          title={id ? 'Edição de Entregadores' : 'Cadastro de Entregadores'}
        />

        <Wrapper>
          <AvatarInput name="avatar_id" tag={id ? 'Editar' : 'Adicionar'} />

          <label htmlFor="name">
            Nome
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="escreva o nome do entregador"
            />
          </label>

          <label htmlFor="email">
            Email
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="email@email.com"
            />
          </label>
        </Wrapper>
      </Form>
    </Container>
  );
}

export default DeliverForm;
