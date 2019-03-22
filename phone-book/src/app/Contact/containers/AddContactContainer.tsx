import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ContactForm } from '../../common';
import { addContact } from '../redux/actions';
import { AppContact, AppContactAction } from '../interfaces';
import { AppState } from '../../../store/interfaces';
import { fetchContacts } from '../../Home/redux/actions';
import { AppHomeAction } from '../../Home/interfaces';

interface AppRoute {
  history: any;
}

interface AppAddContactProps {
  contacts: AppContact[];
}

interface AppAddContactDispatch {
  addContact: (contact: object) => AppContactAction;
  fetchContacts: () => AppHomeAction;
}

class AddContactContainer extends React.Component<RouteComponentProps<AppRoute>
  & AppAddContactDispatch & AppAddContactProps, {}> {

  public componentDidMount() {
    const {fetchContacts, contacts} = this.props;
    if (contacts.length === 0) {
      fetchContacts();
    }
  }

  private handleSubmit = (values: object) => {
    const { addContact, history } = this.props;
    addContact(values);
    history.push('/');
  }

  public render() {
    return (
     <ContactForm title="Add contact" onSubmit={this.handleSubmit}/>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    contacts: state.contactsState.contacts,
  };
};

export default connect<AppAddContactProps, AppAddContactDispatch>(
  mapStateToProps,
  {
    addContact,
    fetchContacts,
  })(AddContactContainer);
