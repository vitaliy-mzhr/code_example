import * as React from 'react';
import { shallow } from 'enzyme';
import Preloader from '../../Preloader';

it('Preloader renders without crashing', () => {
  expect(shallow(<Preloader/>)).toMatchSnapshot();
});
