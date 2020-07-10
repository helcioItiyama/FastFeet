/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import AsyncSelect from '~/components/AsyncSelect';
import history from '~/services/history';
import api from '~/services/api';
import Title from '~/components/Title';
import Wrapper from '~/components/InputWrapper';
import { Container, InputOptions } from './styles';

const schema = Yup.object().shape({
  product: Yup.string().required('Preencha o produto a ser entregue'),
  deliverman_id: Yup.string().required('Escolha o entregador'),
  recipient_id: Yup.string().required('Escolha o destinatário'),
});

function DeliveriesForm() {
  const { id } = useParams();
  const [delivery, setDelivery] = useState({});
  const [defaultDeliverman, setDefaultDeliverman] = useState({});

  useEffect(() => {
    async function loadDelivery() {
      const { data } = await api.get(`delivery/${id}`);
      setDelivery(data);

      const response = await api.get(`recipients/${data.recipient_id}`);
      setDefaultDeliverman({ label: response.data.name });
    }
    if (id) {
      loadDelivery();
    }
  }, []);

  const handleSubmit = async (data) => {
    // eslint-disable-next-line camelcase
    const { recipient_id, deliverman_id, product } = data;

    try {
      if (id) {
        await api.put(`delivery/${id}`, {
          recipient_id,
          deliverman_id,
          product,
        });
      } else {
        await api.post('delivery', {
          recipient_id,
          deliverman_id,
          product,
        });
      }

      toast.success('Entregador cadastrado com sucesso');

      history.push('/deliveries');
    } catch (error) {
      toast.error('Não foi possível cadastrar entregador');
    }
  };

  const filterRecipients = async (inputValue) => {
    const response = await api.get('recipients');
    const options = response.data.map((recipient) => ({
      value: recipient.id,
      label: recipient.name,
    }));
    return options.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const filterDelivermen = async (inputValue) => {
    const response = await api.get('delivers');
    const options = response.data.map((deliverman) => ({
      value: deliverman.id,
      label: deliverman.name,
    }));
    return options.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const handleBack = () => {
    history.push('/deliveries');
  };

  return (
    <Container>
      <Form initialData={delivery} onSubmit={handleSubmit} schema={schema}>
        <Title
          onHandleBack={handleBack}
          title={id ? 'Edição de Encomendas' : 'Cadastro de Encomendas'}
        />

        <Wrapper>
          <InputOptions>
            <label htmlFor="recipient">
              Destinatário
              <AsyncSelect
                id="recipient"
                name="recipient_id"
                placeholder="escreva o nome do destinatário"
                defaultValue={defaultDeliverman}
                defaultOptions
                loadOptions={filterRecipients}
              />
            </label>

            <label htmlFor="deliverman">
              Entregador
              <AsyncSelect
                id="deliverman"
                name="deliverman_id"
                defaultOptions
                placeholder="escreva o nome do entregador"
                loadOptions={filterDelivermen}
              />
            </label>
          </InputOptions>

          <label htmlFor="product">
            Nome do produto
            <Input
              id="product"
              name="product"
              type="text"
              placeholder="escreva o nome do produto"
            />
          </label>
        </Wrapper>
      </Form>
    </Container>
  );
}

export default DeliveriesForm;
