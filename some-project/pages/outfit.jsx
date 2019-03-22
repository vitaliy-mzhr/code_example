import React, { Component } from 'react';

import { getOutfit } from '../src/actions';
import OutfitSidebar from '../src/containers/Sidebars/OutfitSidebar';
import Outfit from '../src/pages/Outfit';



export default class extends Component {
    static async getInitialProps({store, query}) {
        if (query.outfitId) {
            store.dispatch(getOutfit.trigger({
                outfitId: query.outfitId
            }));
        }
    }

    static RSidebar = OutfitSidebar;

    render() {
        return (
            <Outfit/>
        );
    }
}
