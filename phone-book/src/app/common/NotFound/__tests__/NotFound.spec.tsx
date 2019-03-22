import * as React from 'react';
import { shallow } from 'enzyme';
import NotFound from '../../NotFound';

it('NotFound renders without crashing', () => {
  expect(shallow(<NotFound/>)).toMatchSnapshot();
});
