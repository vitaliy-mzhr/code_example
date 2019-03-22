import React, { Component } from 'react';

// Components
import AccountSidebar from '../src/containers/Sidebars/AccountSidebar';
// Pages
import MyInfo from '../src/pages/MyInfo';



class MyInfoPage extends Component {
    static IS_PRIVATE = true;

    static LSidebar = AccountSidebar;

    render() {
        return (
            <MyInfo />
        );
    }
}

export default MyInfoPage;
