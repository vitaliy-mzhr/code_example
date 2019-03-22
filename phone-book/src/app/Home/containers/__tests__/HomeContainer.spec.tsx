import * as React from 'react';
import ConnectedHomeContainer, { HomeContainer } from '../HomeContainer';
import { shallow } from 'enzyme';
import { AppContact } from '../../../Contact/interfaces';
import { AppHomeDispatch, AppHomeProps } from '../../interfaces';
// @ts-ignore
import configureStore from 'redux-mock-store';

describe('Home container test', () => {
  const mockContacts: AppContact[] = [
    {
      id: 1,
      name: {
        first: 'man',
        last: 'awesome',
      },
      phone: [],
      expanded: false,
    },
    {
      id: 2,
      name: {
        first: 'man',
        last: 'awesome',
      },
      phone: [],
      expanded: false,
    }
  ];

  it('ConnectedHomeContainer should renders without crashing with initial state', () => {
    const initialStore: any =  {
      contactsState: {
        isLoading: false,
        contacts: [],
        error: null,
      },
      fetchContacts: jest.fn(),
      toggleContact: jest.fn(),
      deleteContact: jest.fn(),
    };
    const mockStore = configureStore();
    // @ts-ignore
    expect(shallow(<ConnectedHomeContainer store={mockStore(initialStore)}/>)).toMatchSnapshot();
  });

  it('HomeContainer should renders without crashing with initial state', () => {
    const mockProps: AppHomeProps & AppHomeDispatch = {
      isLoading: false,
      contacts: [],
      error: null,
      fetchContacts: jest.fn(),
      toggleContact: jest.fn(),
      deleteContact: jest.fn(),
    };
    const wrapper = shallow(<HomeContainer {...mockProps}/>);
    const instance = wrapper.instance();
    expect(wrapper).toMatchSnapshot();
    // @ts-ignore
    expect(instance.props.fetchContacts).toBeCalled();
  });

  it('HomeContainer should renders without crashing with contacts', () => {
    const mockProps: AppHomeProps & AppHomeDispatch = {
      isLoading: false,
      contacts: mockContacts,
      error: null,
      fetchContacts: jest.fn(),
      toggleContact: jest.fn(),
      deleteContact: jest.fn(),
    };
    const wrapper = shallow(<HomeContainer {...mockProps}/>);
    const instance: any = wrapper.instance();
    expect(wrapper).toMatchSnapshot();
    expect(instance.props.fetchContacts).not.toBeCalled();
  });

  it('HomeContainer should renders with error', () => {
    const mockProps: AppHomeProps & AppHomeDispatch = {
      isLoading: false,
      contacts: [],
      error: 'error',
      fetchContacts: jest.fn(),
      toggleContact: jest.fn(),
      deleteContact: jest.fn(),
    };
    const wrapper = shallow(<HomeContainer {...mockProps}/>);
    expect(wrapper).toMatchSnapshot();
  });
});