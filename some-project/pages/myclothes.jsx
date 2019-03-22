import React, { Component } from 'react';

// Components
import AccountSidebar from '../src/containers/Sidebars/AccountSidebar';
// Pages
import MyClothes from '../src/pages/MyClothes';
// Actions
import { getAllUserClothes } from '../src/actions';



export default class extends Component {
    static async getInitialProps({store}) {
        store.dispatch(getAllUserClothes.trigger());
    }

    static IS_PRIVATE = true;

    static LSidebar = AccountSidebar;

    render() {
        return (
            <MyClothes/>
        );
    }
}
