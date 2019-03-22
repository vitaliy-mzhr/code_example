import * as React from 'react';
import { withRouter, RouteComponentProps, /*Redirect*/ } from 'react-router';
import HomeContainer from '../app/Home/containers/HomeContainer';
import { BaseLayout } from '../app/layouts';
import { Helmet } from 'react-helmet';

interface AppRoute {
  match: any;
}
const HomePage: React.StatelessComponent<RouteComponentProps<AppRoute>> = (props) => (
  <BaseLayout>
    <Helmet title={'All contacts'}/>
    <HomeContainer {...props}/>
  </BaseLayout>
);

export default withRouter(HomePage);
