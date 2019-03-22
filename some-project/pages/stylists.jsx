import React, { Component } from 'react';

import Stylists from '../src/pages/Stylists';
import { getStylists } from '../src/actions';
import StylistsSidebar from '../src/containers/Sidebars/StylistsSidebar';



export default class extends Component {
    static async getInitialProps({store}) {
        store.dispatch(getStylists.trigger());
    }

    static LSidebar = StylistsSidebar;

    render() {
        return (
            <Stylists/>
        );
    }
}
