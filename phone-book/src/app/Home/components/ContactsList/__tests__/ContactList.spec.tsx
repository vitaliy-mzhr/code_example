import * as React from 'react';
import { shallow } from 'enzyme';
import ContactList from '../../ContactsList';
import { AppSearchDispatch } from '../../../../Nav/interfaces';
import { AppContact } from '../../../../Contact/interfaces';

interface AppContactListProps {
  contacts: AppContact[];
}

describe('ContactList component test', () => {
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

  it('ContactList component renders with empty contacts', () => {
    const mockProps: AppContactListProps & AppSearchDispatch = {
      contacts: [],
      toggleContact: jest.fn(),
      deleteContact: jest.fn(),
    };
    expect(shallow(<ContactList {...mockProps}/>)).toMatchSnapshot();
  });
  it('ContactList component renders with contacts', () => {
    const mockProps: AppContactListProps & AppSearchDispatch = {
      contacts: mockContacts,
      toggleContact: jest.fn(),
      deleteContact: jest.fn(),
    };
    expect(shallow(<ContactList {...mockProps}/>)).toMatchSnapshot();
  });

  const mockContactsWithDividers: any = [
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
      divider: 'a',
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

  it('ContactList component renders with contacts and dividers', () => {
    const mockProps: AppContactListProps & AppSearchDispatch = {
      contacts: mockContactsWithDividers,
      toggleContact: jest.fn(),
      deleteContact: jest.fn(),
    };
    expect(shallow(<ContactList {...mockProps}/>)).toMatchSnapshot();
  });
});