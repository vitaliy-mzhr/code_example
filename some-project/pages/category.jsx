import React, { Component } from 'react';

import Category from '../src/pages/Category';
import { getCategory } from '../src/actions';
import CategorySidebar from '../src/containers/Sidebars/CategorySidebar';



export default class extends Component {
    static async getInitialProps({store, query}) {
        if (query.id && query.type) {
            store.dispatch(getCategory.trigger({id: query.id, type: query.type}));
        }
    }

    static LSidebar = CategorySidebar;

    render() {
        return (
            <Category/>
        );
    }
}
