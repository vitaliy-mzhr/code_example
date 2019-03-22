import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Head from 'next/head';

import { getStylistOutfits } from '../../actions';
import { mapRoutineCreators } from '../../actions/actionRoutines';
import Collection from '../../containers/Collection';
import { PRODUCT_NAME } from '../../config';



class StylistCollection extends Component {
    render() {
        const {getStylistOutfits, name} = this.props;

        return (
            <Fragment>
                <Head>
                    <title>
                        {name} outfits - {PRODUCT_NAME}
                    </title>
                </Head>
                <Collection getCollectionOutfits={getStylistOutfits.trigger}/>
            </Fragment>
        );
    }
}

function mapStateToProps({collection}) {
    return {
        name: collection.data.name
    };
}

export default connect(mapStateToProps, mapRoutineCreators({getStylistOutfits}))(StylistCollection);
