import React, { Component } from 'react';

import { getClothes } from '../src/actions';
import ClothesCollection from '../src/pages/ClothesCollection';
import ClothesCollectionSidebar from '../src/containers/Sidebars/ClothesCollectionSidebar';



export default class extends Component {
    static async getInitialProps({store, query}) {
        if (query.clothesSlug1 && query.clothesSlug2) {
            store.dispatch(getClothes.trigger({
                clothesSlug1: query.clothesSlug1,
                clothesSlug2: query.clothesSlug2,
                withOutfits: true
            }));
        }
    }

    static LSidebar = ClothesCollectionSidebar;

    render() {
        return (
            <ClothesCollection/>
        );
    }
}
