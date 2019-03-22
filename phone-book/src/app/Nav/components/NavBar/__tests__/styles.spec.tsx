import * as React from 'react';
import NavBarStyles from '../styles';
import { shallow } from 'enzyme';
import 'jest-styled-components';
import { mainTheme } from '../../../../../styles/themes';

it('NavBarStyles applied correctly', () => {
  expect(shallow(<NavBarStyles theme={mainTheme} />)).toMatchSnapshot();
});