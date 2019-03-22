import * as React from 'react';
import HomeStyles from '../styles';
import { shallow } from 'enzyme';
import 'jest-styled-components';
import { mainTheme } from '../../../../../styles/themes';

it('HomeStyles applied correctly', () => {
  expect(shallow(<HomeStyles theme={mainTheme} />)).toMatchSnapshot();
});