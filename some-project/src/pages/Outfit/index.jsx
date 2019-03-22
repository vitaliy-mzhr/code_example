import React, { Component, Fragment } from 'react';
import Head from 'next/head';
import { connect } from 'react-redux';
import get from 'lodash/fp/get';

import { PRODUCT_NAME } from '../../config';
import OutfitContent from './OutfitContent';



class Outfit extends Component {
    render() {
        const {stylistName} = this.props;

        return (
            <Fragment>
                <Head>
                    <title>
                        Outfit styled by {stylistName} - {PRODUCT_NAME}
                    </title>
                </Head>

                <OutfitContent/>
            </Fragment>
        );
    }
}

function mapStateToProps({outfit}) {
    return {stylistName: get('data.stylist.name', outfit)};
}

export default connect(mapStateToProps)(Outfit);
