import * as React from 'react';
import { Header } from '../../common';
import BaseLayoutStyles from './styles';

const BaseLayout: React.StatelessComponent<{}> = ({children}) => (
  <BaseLayoutStyles>
    <Header/>
    {children}
  </BaseLayoutStyles>
);

export default BaseLayout;
