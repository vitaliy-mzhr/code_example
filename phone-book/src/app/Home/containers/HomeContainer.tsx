import * as React from 'react';
import { connect } from 'react-redux';
import { fetchContacts } from '../redux/actions';
import { AppHomeDispatch, AppHomeProps } from '../interfaces';
import { AppState } from '../../../store/interfaces';
import { getSortedContactsWithDividers } from '../redux/selectors';
import { Home } from '../components';
import { ErrorPage } from '../../common';
import { toggleContact, deleteContact } from '../../Contact/redux/actions';

export class HomeContainer extends React.PureComponent<AppHomeProps & AppHomeDispatch, {}> {

  public componentDidMount() {
    const {fetchContacts, contacts} = this.props;
    if (contacts.length === 0) {
      fetchContacts();
    }
  }

  public render() {
    const {isLoading, error, toggleContact, deleteContact, contacts} = this.props;
    return (
      error
        ? <ErrorPage error={error}/>
        : (
          <Home
            contacts={contacts}
            isLoading={isLoading}
            toggleContact={toggleContact}
            deleteContact={deleteContact}
          />
        )
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  isLoading: state.contactsState.isLoading,
  contacts: getSortedContactsWithDividers(state.contactsState),
  error: state.contactsState.error,
});

export default connect<AppHomeProps, AppHomeDispatch>(
  mapStateToProps,
  {
    fetchContacts,
    toggleContact,
    deleteContact,
  })(HomeContainer);
