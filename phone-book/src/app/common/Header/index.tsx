import * as React from 'react';
import HeaderStyles from './styles';
import NavContainer from '../../Nav/containers/NavContainer';

const Header: React.StatelessComponent<{}> = () => (
  <HeaderStyles>
    <NavContainer/>
  </HeaderStyles>
);

export default Header;
