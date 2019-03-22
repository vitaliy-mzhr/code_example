import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { NotFound } from '../app/common';
import { HomePage, SearchPage, AddContactPage, EditContact } from '../pages';

const Routes: React.StatelessComponent<{}> = () => {
  return (
    <Switch>
      <Route exact={true} path="/" component={HomePage}/>
      <Route exact={true} path="/search" component={SearchPage}/>
      <Route exact={true} path="/add" component={AddContactPage}/>
      <Route exact={true} path="/edit/:id" component={EditContact}/>
      <Route component={NotFound}/>
    </Switch>
  );
};

export default Routes;