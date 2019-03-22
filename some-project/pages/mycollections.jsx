import React, { Component } from 'react';

// Components
import AccountSidebar from '../src/containers/Sidebars/AccountSidebar';
// Pages
import MyCollections from '../src/pages/MyCollections';
// Actions
import { getUserCollections } from '../src/actions';



class MyCollectionsPage extends Component {
    static async getInitialProps({ store }) {
        store.dispatch(getUserCollections.trigger());
    }

    static IS_PRIVATE = true;

    static LSidebar = AccountSidebar;

    render() {
        return (
            <MyCollections />
        );
    }
}

export default MyCollectionsPage;
