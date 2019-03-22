import * as React from 'react';
import ContactsDividerStyles from '../styles';
import { shallow } from 'enzyme';
import 'jest-styled-components';
import { mainTheme } from '../../../../../styles/themes';

it('ContactsDividerStyles applied correctly', () => {
  expect(shallow(<ContactsDividerStyles theme={mainTheme} />)).toMatchSnapshot();
});