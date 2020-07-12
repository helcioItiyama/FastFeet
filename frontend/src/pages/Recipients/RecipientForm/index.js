/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { Form, Input } from '@rocketseat/unform';
import history from '~/services/history';
import api from '~/services/api';
import Title from '~/components/Title';
import Wrapper from '~/components/InputWrapper';
import { Container, Address, Location } from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('Preencha o nome do destinatário'),
  street: Yup.string().required('Preencha o endereço da entrega'),
  number: Yup.number()
    .positive()
    .integer()
    .required('Preencha o número do endereço'),
  complement: Yup.string(),
  state: Yup.string().required('Preencha o estado da entrega'),
  city: Yup.string().required('Preencha a cidade da entrega'),
  zip_code: Yup.string().min(8).required('Preencha o cep da entrega'),
});

function RecipientForm() {
  const { id } = useParams();
  const [postalNumber, setPostalNumber] = useState('');
  const [recipient, setRecipient] = useState({});

  useEffect(() => {
    async function loadRecipient() {
      const { data } = await api.get(`recipients/${id}`);
      const { zip_code } = data;
      setRecipient(data);
      setPostalNumber(zip_code);
    }
    if (id) {
      loadRecipient();
    }
  }, []);

  const handleSubmit = async (data) => {
    // eslint-disable-next-line camelcase
    const { name, street, number, complement, state, city, zip_code } = data;
    try {
      if (id) {
        await api.put(`recipients/${id}`, {
          name,
          street,
          number,
          complement,
          state,
          city,
          zip_code,
        });
        toast.success('Destinatário editado com sucesso');
      } else {
        await api.post('recipients', {
          name,
          street,
          number,
          complement,
          state,
          city,
          zip_code,
        });
        toast.success('Destinatário cadastrado com sucesso');
      }
      history.push('/recipients');
    } catch (error) {
      if (id) {
        toast.error('Não foi possível editar destinatário');
      } else {
        toast.error('Não foi possível cadastrar destinatário');
      }
    }
  };

  const handlePostal = (event) => {
    let cep = event.target.value;

    cep = cep.replace(/\D/g, '');

    if (cep.length > 8) {
      cep = cep.slice(0, -1);
    }

    const formattedCep = cep.replace(/(\d{5})(\d)/, '$1-$2');

    setPostalNumber(formattedCep);
  };

  const handleBack = () => {
    history.push('/recipients');
  };

  return (
    <Container>
      <Form initialData={recipient} onSubmit={handleSubmit} schema={schema}>
        <Title
          onHandleBack={handleBack}
          title={id ? 'Edição de Destinatário' : 'Cadastro de Destinatário'}
        />

        <Wrapper>
          <label htmlFor="name">
            Nome
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="escreva o nome do destinatário"
            />
          </label>

          <Address>
            <label htmlFor="address">
              Endereço
              <Input
                id="address"
                name="street"
                type="text"
                placeholder="Rua Fulano de Tal"
              />
            </label>

            <label htmlFor="number">
              Número
              <Input id="number" name="number" type="text" placeholder="0000" />
            </label>

            <label htmlFor="complement">
              Complemento
              <Input id="complement" name="complement" type="text" />
            </label>
          </Address>

          <Location>
            <label htmlFor="city">
              Cidade
              <Input id="city" name="city" type="text" placeholder="Maringá" />
            </label>

            <label htmlFor="state">
              Estado
              <Input id="state" name="state" type="text" placeholder="Paraná" />
            </label>

            <label htmlFor="postal">
              CEP
              <Input
                onChange={handlePostal}
                id="postal"
                name="zip_code"
                value={postalNumber}
                type="text"
                placeholder="00000-000"
              />
            </label>
          </Location>
        </Wrapper>
      </Form>
    </Container>
  );
}

export default RecipientForm;
