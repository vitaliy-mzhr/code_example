import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import EditContactContainer from '../app/Contact/containers/EditContactContainer';
import { BaseLayout } from '../app/layouts';
import { Helmet } from 'react-helmet';

interface AppRoute {
  match: any;
}

const AddContactPage: React.StatelessComponent<RouteComponentProps<AppRoute>> = (props) => (
  <BaseLayout>
    <Helmet title={'Edit contact'}/>
    <EditContactContainer {...props}/>
  </BaseLayout>
);

export default withRouter(AddContactPage);
