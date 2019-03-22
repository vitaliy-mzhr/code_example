import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import AddContactContainer from '../app/Contact/containers/AddContactContainer';
import { BaseLayout } from '../app/layouts';
import { Helmet } from 'react-helmet';

interface AppRoute {
  history: any;
}
const AddContactPage: React.StatelessComponent<RouteComponentProps<AppRoute>> = (props) => (
  <BaseLayout>
    <Helmet title={'Add contacts'}/>
    <AddContactContainer {...props} />
  </BaseLayout>
);

export default withRouter(AddContactPage);
