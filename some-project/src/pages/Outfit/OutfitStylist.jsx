import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { numberMetricFormat } from '../../utils/helpers';
import InstagramIcon from '../../components/SVG/InstagramIcon';
import LinkTo from '../../components/LinkTo';



const OutfitStylist = ({followers, name, slug, isVisible}) => (
    <div className={cn('outfit-stylist', {'is-visible': isVisible})}>
        <div>
            <span>By</span> <LinkTo to={`/stylists/${slug}`}>{name}</LinkTo>
        </div>
        <span>
            <LinkTo to={`//instagram.com/${name}`} title="Instagram" target="_blank" rel="noopener noreferrer">
                <InstagramIcon/>
            </LinkTo>
            {numberMetricFormat(followers)} followers
        </span>
    </div>
);

OutfitStylist.propTypes = {
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    followers: PropTypes.number,
    isVisible: PropTypes.bool
};
OutfitStylist.defaultProps = {
    followers: 0,
    isVisible: false
};

export default React.memo(OutfitStylist);
