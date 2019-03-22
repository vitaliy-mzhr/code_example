import * as React from 'react';
import NotFoundStyles from '../styles';
import { shallow } from 'enzyme';
import 'jest-styled-components';
import { mainTheme } from '../../../../styles/themes';

it('NotFoundStyles applied correctly', () => {
  expect(shallow(<NotFoundStyles theme={mainTheme} />)).toMatchSnapshot();
});