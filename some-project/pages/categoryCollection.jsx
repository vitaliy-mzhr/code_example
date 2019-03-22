import React, { Component } from 'react';

import { getCategoryCollection } from '../src/actions';
import CategoryCollectionSidebar from '../src/containers/Sidebars/CategoryCollectionSidebar';
import CategoryCollection from '../src/pages/CategoryCollection';



export default class extends Component {
    static async getInitialProps({store, query}) {
        if (query.collectionSlug) {
            store.dispatch(getCategoryCollection.trigger({
                slug: query.collectionSlug,
                collectionParent: query.collectionParent,
                withOutfits: true
            }));
        }
    }

    static LSidebar = CategoryCollectionSidebar;

    render() {
        return (
            <CategoryCollection/>
        );
    }
}
