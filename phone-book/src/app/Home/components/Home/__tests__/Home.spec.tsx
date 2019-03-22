import * as React from 'react';
import { shallow } from 'enzyme';
import Home from '../../Home';
import { AppHomeProps } from '../../../interfaces';
import { AppSearchDispatch } from '../../../../Nav/interfaces';

describe('Home component test', () => {
  it('Home component renders without crashing', () => {
    const mockProps: AppHomeProps & AppSearchDispatch = {
      isLoading: false,
      contacts: [],
      error: null,
      toggleContact: jest.fn(),
      deleteContact: jest.fn(),
    };
    expect(shallow(<Home {...mockProps}/>)).toMatchSnapshot();
  });
  it('Home component renders when loading', () => {
    const mockProps: AppHomeProps & AppSearchDispatch = {
      isLoading: true,
      contacts: [],
      error: null,
      toggleContact: jest.fn(),
      deleteContact: jest.fn(),
    };
    expect(shallow(<Home {...mockProps}/>)).toMatchSnapshot();
  });
});
