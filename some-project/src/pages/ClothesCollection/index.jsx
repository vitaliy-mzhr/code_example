import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Head from 'next/head';

import { getClothesOutfits } from '../../actions';
import { mapRoutineCreators } from '../../actions/actionRoutines';
import Collection from '../../containers/Collection';
import { PRODUCT_NAME } from '../../config';



class ClothesCollection extends Component {
    getOutfits = (params) => {
        const {getClothesOutfits, parentSlug} = this.props;
        getClothesOutfits.trigger({clothesSlug1: parentSlug, ...params});
    };

    render() {
        const {category1_name, name} = this.props;

        return (
            <Fragment>
                <Head>
                    <title>
                        {name} in {category1_name} - {PRODUCT_NAME}
                    </title>
                </Head>

                <Collection getCollectionOutfits={this.getOutfits}/>
            </Fragment>
        );
    }
}

function mapStateToProps({collection}) {
    return {
        parentSlug: collection.data.parentSlug,
        name: collection.data.name,
        category1_name: collection.data.category1_name
    };
}

export default connect(mapStateToProps, mapRoutineCreators({getClothesOutfits}))(ClothesCollection);
