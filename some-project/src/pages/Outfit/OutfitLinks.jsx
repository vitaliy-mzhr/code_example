import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import OutfitBtnLink from '../../components/OutfitBtnLink';



const OutfitLinks = ({prevLink, nextLink, ready, hide}) => (
    <Fragment>
        {prevLink && ready && <OutfitBtnLink id={prevLink} className={cn('prev-outfit-btn', {'is-hidden': hide})}/>}
        {nextLink && ready && <OutfitBtnLink id={nextLink} className={cn('next-outfit-btn', {'is-hidden': hide})}/>}
    </Fragment>
);

OutfitLinks.propTypes = {
    prevLink: PropTypes.string,
    nextLink: PropTypes.string,
    ready: PropTypes.bool,
    hide: PropTypes.bool
};
OutfitLinks.defaultProps = {
    prevLink: '',
    nextLink: '',
    ready: false,
    hide: false
};

export default React.memo(OutfitLinks);
