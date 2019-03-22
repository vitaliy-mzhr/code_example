import React, { Fragment } from 'react';

import LinkTo from '../../components/LinkTo';



const userFlowItems = [
    {
        id: 1,
        title: 'Select your occasion or style',
        icon: '/static/images/bag-icon.svg',
        description: (
            <Fragment>
                Choose from our 60+ occasions (work to weekend) and 25+ styles (formal to casual)
            </Fragment>
        )
    },
    {
        id: 2,
        title: 'Browse recommended outfits',
        icon: '/static/images/suit-icon.svg',
        description: (
            <Fragment>
                Get inspired by outfits curated by <LinkTo to="/stylists">professional Instagram stylists</LinkTo> for your occasion or style
            </Fragment>
        )
    },
    {
        id: 3,
        title: 'Buy the clothes you want',
        icon: '/static/images/tags-icon.svg',
        description: (
            <Fragment>
                Shop the clothes matching your price point and preferred brands. We mirror prices/sales of retailers
            </Fragment>
        )
    }
];

export default userFlowItems;
