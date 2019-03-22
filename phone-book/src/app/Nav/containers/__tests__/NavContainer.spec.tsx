import * as React from 'react';
import ConnectedNavContainer, { NavContainer } from '../NavContainer';
import { shallow } from 'enzyme';
// @ts-ignore
import configureStore from 'redux-mock-store';

describe('Nav container test', () => {
  let wrapper: any;
  let instance: any;
  let mockProps: any;

  beforeEach(() => {
    mockProps = {
      inputValue: '',
      match: {
        path: '/',
      },
      history: {
        push: jest.fn(),
      },
      onSearchChange: jest.fn(),
      clearSearchInput: jest.fn(),
      deleteContact: jest.fn(),
    };
    wrapper = shallow(<NavContainer {...mockProps}/>);
    instance = wrapper.instance();
  });

  const initialStore = {
    searchState: {
      inputValue: ''
    },
    onSearchChange: jest.fn(),
    clearSearchInput: jest.fn(),
    deleteContact: jest.fn(),
  };

  const mockStore = configureStore();
  it('ConnectedNavContainer renders without crashing', () => {
    // @ts-ignore
    expect(shallow(<ConnectedNavContainer store={mockStore(initialStore)}/>)).toMatchSnapshot();
  });

  it('NavContainer should renders without crashing with initial state', () => {
    // const instance = wrapper.instance();
    expect(wrapper).toMatchSnapshot();
  });

  it('NavContainer state equals initial state', () => {
    const initialState = {
      inputValue: '',
    };
    expect(instance.state).toEqual(initialState);
  });

  it('NavContainer should handle methods properly', () => {
    instance.clearInput();
    expect(instance.props.clearSearchInput).toBeCalled();
    const mockEvent = {
      target: {
        value: '11111',
      }
    };
    instance.handleSearch(mockEvent);
    expect(instance.state.inputValue).toEqual('11111');
    expect(instance.isMainPage()).toBeTruthy();
    expect(instance.isOnSearch()).toBeFalsy();
    instance.handleRedirect();
    expect(instance.props.history.push).toBeCalledWith('/search');
  });

  it('NavContainer should not redirect when on search', () => {
    mockProps = {
      inputValue: '',
      match: {
        path: '/search',
      },
      history: {
        push: jest.fn(),
      },
      onSearchChange: jest.fn(),
      clearSearchInput: jest.fn(),
      deleteContact: jest.fn(),
    };
    wrapper = shallow(<NavContainer {...mockProps}/>);
    instance = wrapper.instance();
    instance.handleRedirect();
    expect(instance.props.history.push).not.toBeCalled();
  });
});