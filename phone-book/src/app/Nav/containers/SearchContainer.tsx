import * as React from 'react';
import { connect } from 'react-redux';
import { fetchContacts } from '../../Home/redux/actions';
import { AppSearchProps, AppSearchDispatch } from '../interfaces';
import { AppState } from '../../../store/interfaces';
import { getSortedContacts } from '../../Home/redux/selectors';
import { Search } from '../components';
import { filterContacts } from '../../../helpers';
import { ErrorPage } from '../../common';
import { toggleContact, deleteContact } from '../../Contact/redux/actions';
import { AppHomeAction } from '../../Home/interfaces';

interface AppSearchContainerDispatch extends AppSearchDispatch {
  fetchContacts: () => AppHomeAction;
}

class SearchContainer extends React.PureComponent<AppSearchProps & AppSearchContainerDispatch, {}> {

  public componentDidMount() {
    const {fetchContacts, contacts} = this.props;
    if (contacts.length === 0) {
      fetchContacts();
    }
  }

  public render() {
    const {isLoading, searchInput, error, toggleContact, deleteContact, contacts} = this.props;
    return (
      error
        ? <ErrorPage error={error}/>
        : (
          <Search
            contacts={filterContacts(contacts, searchInput)}
            isLoading={isLoading}
            searchInput={searchInput}
            toggleContact={toggleContact}
            deleteContact={deleteContact}
          />
        )
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  isLoading: state.contactsState.isLoading,
  error: state.contactsState.error,
  contacts: getSortedContacts(state.contactsState),
  searchInput: state.searchState.inputValue,
});

export default connect<AppSearchProps, AppSearchContainerDispatch>(
  mapStateToProps,
  {
    fetchContacts,
    toggleContact,
    deleteContact,
  })(SearchContainer);
