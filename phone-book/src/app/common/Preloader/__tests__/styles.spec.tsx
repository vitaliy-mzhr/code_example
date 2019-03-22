import * as React from 'react';
import PreloaderStyles from '../styles';
import { shallow } from 'enzyme';
import 'jest-styled-components';
import { mainTheme } from '../../../../styles/themes';

it('PreloadertStyles applied correctly', () => {
  expect(shallow(<PreloaderStyles theme={mainTheme} />)).toMatchSnapshot();
});