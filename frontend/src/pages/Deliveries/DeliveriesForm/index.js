/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import AsyncSelect from '~/components/AsyncSelect';
import history from '~/services/history';
import api from '~/services/api';
import Title from '~/components/Title';
import Input from '~/components/Input';
import Wrapper from '~/components/InputWrapper';
import { Container, InputOptions } from './styles';

const schema = Yup.object().shape({
  product: Yup.string().required('Preencha o produto a ser entregue'),
  deliverman_id: Yup.string().required('Escolha o entregador'),
  recipient_id: Yup.string().required('Escolha o destinatário'),
});

function DeliveriesForm() {
  const { id } = useParams();
  const formRef = useRef(null);

  useEffect(() => {
    async function loadDelivery() {
      const { data } = await api.get(`delivery/${id}`);
      formRef.current.setData(data);

      formRef.current.setFieldValue('recipient_id', {
        value: data?.recipient_id,
        label: data?.recipient?.name,
      });

      formRef.current.setFieldValue('deliverman_id', {
        value: data?.deliverman_id,
        label: data?.deliverman?.name,
      });
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
        toast.success('Encomenda editada com sucesso');
      } else {
        await api.post('delivery', {
          recipient_id,
          deliverman_id,
          product,
        });
        toast.success('Encomenda cadastrada com sucesso');
      }

      history.push('/deliveries');
    } catch (error) {
      if (id) {
        toast.error('Não foi possível editar a encomenda');
      } else {
        toast.error('Não foi possível cadastrar a encomenda');
      }
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
      <Form ref={formRef} onSubmit={handleSubmit} schema={schema}>
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
