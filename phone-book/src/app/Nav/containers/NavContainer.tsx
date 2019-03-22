import * as React from 'react';
import { connect } from 'react-redux';
import { clearSearchInput, onSearchChange } from '../redux/actions';
import { fetchContacts } from '../../Home/redux/actions';
import { AppNavProps, AppNavDispatch } from '../interfaces';
import { AppState } from '../../../store/interfaces';
import { NavBar } from '../components';
import { RouteComponentProps, withRouter } from 'react-router';
import { escape, debounce } from 'lodash';

interface AppRoute {
  match: any;
  history: any;
}

export class NavContainer extends
  React.PureComponent<RouteComponentProps<AppRoute> & AppNavDispatch & AppNavProps, any> {
  private readonly debouncedSearch: any;

  constructor(props: RouteComponentProps<AppRoute> & AppNavDispatch & AppNavProps) {
    super(props);

    this.state = {
      inputValue: '',
    };

    this.debouncedSearch = debounce(this.props.onSearchChange, 500);
  }
  public isOnSearch = () => {
    const {match} = this.props;
    return match.path === '/search';
  }

  public isMainPage = () => {
    const {match} = this.props;
    return match.path === '/';
  }

  public handleRedirect = () => {
    const { history } = this.props;
    if (!this.isOnSearch()) {
      history.push('/search');
    }
  }

  public clearInput = () => this.props.clearSearchInput();

  public handleSearch = (e: any) => {
    this.setState({inputValue: e.target.value}, () => this.debouncedSearch(escape(this.state.inputValue)));
  }

  public render() {
    const {inputValue} = this.state;
    return (
     <NavBar
       isMainPage={this.isMainPage()}
       isOnSearch={this.isOnSearch()}
       handleRedirect={this.handleRedirect}
       handleSearch={this.handleSearch}
       inputValue={inputValue}
       clearInput={this.clearInput}
     />
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  inputValue: state.searchState.inputValue,
});

export default connect<AppNavProps, AppNavDispatch>(
  mapStateToProps,
  {
    onSearchChange,
    clearSearchInput,
    fetchContacts,
  })(withRouter(NavContainer));
