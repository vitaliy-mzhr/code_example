import React, { Component } from 'react';

// Components
import AccountSidebar from '../src/containers/Sidebars/AccountSidebar';
// Pages
import MyStylists from '../src/pages/MyStylists';
// Actions
import { getUserStylists } from '../src/actions';



export default class extends Component {
    static async getInitialProps({store}) {
        store.dispatch(getUserStylists.trigger());
    }

    static IS_PRIVATE = true;

    static LSidebar = AccountSidebar;

    render() {
        return (
            <MyStylists/>
        );
    }
}
