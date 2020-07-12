import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';
import Login from '~/pages/Login';
import Recipients from '~/pages/Recipients';
import RecipientForm from '~/pages/Recipients/RecipientForm';
import Delivers from '~/pages/Delivers';
import DeliverForm from '~/pages/Delivers/DeliverForm';
import Deliveries from '~/pages/Deliveries';
import DeliveriesForm from '~/pages/Deliveries/DeliveriesForm';
import Problems from '~/pages/Problems';

function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Login} />

      <Route path="/recipients" isPrivate component={Recipients} />
      <Route path="/register/recipients" isPrivate component={RecipientForm} />
      <Route path="/edit/recipients/:id" isPrivate component={RecipientForm} />

      <Route path="/delivers" isPrivate component={Delivers} />
      <Route path="/register/delivers" isPrivate component={DeliverForm} />
      <Route path="/edit/delivers/:id" isPrivate component={DeliverForm} />

      <Route path="/deliveries" isPrivate component={Deliveries} />
      <Route path="/register/delivery" isPrivate component={DeliveriesForm} />
      <Route path="/edit/delivery/:id" isPrivate component={DeliveriesForm} />

      <Route path="/problems" isPrivate component={Problems} />
    </Switch>
  );
}

export default Routes;
