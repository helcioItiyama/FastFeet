/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import logo from '~/assets/fastfeet-logo.svg';

import { loginRequest } from '~/store/modules/auth/actions';

import { Container } from './styles';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
});

function Login() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const handleSubmit = (data) => {
    const { email, password } = data;
    dispatch(loginRequest(email, password));
  };

  return (
    <Container>
      <Form schema={schema} onSubmit={handleSubmit}>
        <img src={logo} alt="FastFeet" />

        <label htmlFor="email">
          <h4>Seu e-mail</h4>

          <Input
            name="email"
            id="email"
            type="email"
            placeholder="Digite o seu email"
          />
        </label>

        <label htmlFor="password">
          <h4>Sua senha</h4>

          <Input
            name="password"
            id="password"
            type="password"
            placeholder="Digite sua senha"
          />
        </label>

        <button type="submit">
          {loading ? 'Carregando...' : 'Entrar no sistema'}
        </button>
      </Form>
    </Container>
  );
}

export default Login;
