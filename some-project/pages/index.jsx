import React, { Component } from 'react';

import Home from '../src/pages/Home';
import { getHomePage } from '../src/actions';



class Index extends Component {
    static async getInitialProps({store}) {
        store.dispatch(getHomePage.trigger());
    }

    render() {
        return (
            <Home/>
        );
    }
}

export default Index;
