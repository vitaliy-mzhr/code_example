import React from 'react';
import PropTypes from 'prop-types';
import LinkTo from '../LinkTo';
import ArrowIcon from '../SVG/ArrowIcon';



const OutfitBtnLink = ({id, ...rest}) => (
    <LinkTo to={`/outfit/${id}`} {...rest}>
        <ArrowIcon
            pathProps={{
                strokeWidth: '0.5',
                stroke: 'white',
                strokeLinejoin: 'round',
                strokeLinecap: 'round'
            }}
        />
    </LinkTo>
);

OutfitBtnLink.propTypes = {
    id: PropTypes.string.isRequired
};

export default OutfitBtnLink;

