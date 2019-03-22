import React, { Component } from 'react';

import { getStylist } from '../src/actions';
import StylistCollection from '../src/pages/StylistCollection';
import StylistCollectionSidebar from '../src/containers/Sidebars/StylistCollectionSidebar';



export default class extends Component {
    static async getInitialProps({store, query}) {
        if (query.stylistSlug) {
            store.dispatch(getStylist.trigger({
                slug: query.stylistSlug,
                withOutfits: true
            }));
        }
    }

    static LSidebar = StylistCollectionSidebar;

    render() {
        return (
            <StylistCollection/>
        );
    }
}
