import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Head from 'next/head';

import { getCategoryCollectionOutfits } from '../../actions';
import { mapRoutineCreators } from '../../actions/actionRoutines';
import Collection from '../../containers/Collection';
import { PRODUCT_NAME } from '../../config';



class CategoryCollection extends Component {
    render() {
        const {getCategoryCollectionOutfits, name} = this.props;

        return (
            <Fragment>
                <Head>
                    <title>
                        {name} dress code - {PRODUCT_NAME}
                    </title>
                </Head>

                <Collection getCollectionOutfits={getCategoryCollectionOutfits.trigger}/>
            </Fragment>
        );
    }
}

function mapStateToProps({collection}) {
    return {
        name: collection.data.name
    };
}

export default connect(mapStateToProps, mapRoutineCreators({getCategoryCollectionOutfits}))(CategoryCollection);
