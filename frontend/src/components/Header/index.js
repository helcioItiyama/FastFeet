import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import history from '~/services/history';
import logo from '~/assets/fastfeet-logo.svg';
import { logout } from '~/store/modules/auth/actions';

import { Container, Tab } from './styles';

function Header() {
  const dispatch = useDispatch();
  const [choose, setChoose] = useState(
    window.location.pathname.replace('/', '')
  );

  function handleSelect(selectPage) {
    history.push(`/${selectPage}`);
    setChoose(selectPage);
  }

  function handleLogout() {
    dispatch(logout());
  }

  return (
    <Container>
      <div>
        <img
          src={logo}
          alt="FastFeet"
          onClick={() => handleSelect('')}
          role="presentation"
        />

        <ul>
          <Tab
            onClick={() => handleSelect('deliveries')}
            isCurrentPage={choose === 'deliveries'}
            role="presentation"
          >
            Encomendas
          </Tab>

          <Tab
            onClick={() => handleSelect('delivers')}
            isCurrentPage={choose === 'delivers'}
            role="presentation"
          >
            Entregadores
          </Tab>

          <Tab
            onClick={() => handleSelect('recipients')}
            isCurrentPage={choose === 'recipients'}
            role="presentation"
          >
            Destinatários
          </Tab>

          <Tab
            onClick={() => handleSelect('problems')}
            isCurrentPage={choose === 'problems'}
            role="presentation"
          >
            Problemas
          </Tab>
        </ul>
      </div>

      <div>
        <h3>Admin FastFeet</h3>
        <button type="button" onClick={handleLogout}>
          Sair do sistema
        </button>
      </div>
    </Container>
  );
}

export default Header;
