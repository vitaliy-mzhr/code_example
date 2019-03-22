import * as React from 'react';
import ContactsListStyles from '../styles';
import { shallow } from 'enzyme';
import 'jest-styled-components';
import { mainTheme } from '../../../../../styles/themes';

it('ContactsListStyles applied correctly', () => {
  expect(shallow(<ContactsListStyles theme={mainTheme} />)).toMatchSnapshot();
});