import * as React from 'react';
import SearchContainer from '../app/Nav/containers/SearchContainer';
import { BaseLayout } from '../app/layouts';
import { Helmet } from 'react-helmet';

const SearchPage: React.StatelessComponent<{}> = (props) => (
  <BaseLayout>
    <Helmet title={`Search contacts`}/>
    <SearchContainer {...props}/>
  </BaseLayout>
);

export default SearchPage;
