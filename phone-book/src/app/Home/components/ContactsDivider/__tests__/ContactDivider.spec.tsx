import * as React from 'react';
import { shallow } from 'enzyme';
import ContactsDivider from '../../ContactsDivider';

it('ContactsDivider component renders without crashing', () => {
  expect(shallow(<ContactsDivider divider="test"/>)).toMatchSnapshot();
});