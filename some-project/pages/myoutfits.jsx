import React, { Component } from 'react';

// Components
import AccountSidebar from '../src/containers/Sidebars/AccountSidebar';
// Pages
import MyOutfits from '../src/pages/MyOutfits';
// Actions
import { getAllUserOutfits } from '../src/actions';



export default class extends Component {
    static async getInitialProps({store}) {
        store.dispatch(getAllUserOutfits.trigger());
    }

    static IS_PRIVATE = true;

    static LSidebar = AccountSidebar;

    render() {
        return (
            <MyOutfits/>
        );
    }
}
