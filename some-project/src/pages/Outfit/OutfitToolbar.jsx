import React from 'react';
import PropTypes from 'prop-types';

import OutfitStylist from './OutfitStylist';
import SaveOutfitBtn from './SaveOutfitBtn';



const OutfitToolbar = ({stylistName, followers, stylistSlug, saved, likes, onAction, isVisible}) => (
    <div className="outfit-page__toolbar">
        <OutfitStylist name={stylistName} followers={followers} isVisible={isVisible} slug={stylistSlug}/>
        <SaveOutfitBtn isOn={saved} likes={likes} onClick={onAction} isVisible={isVisible}/>
    </div>
);

OutfitToolbar.propTypes = {
    stylistName: PropTypes.string.isRequired,
    followers: PropTypes.number,
    stylistSlug: PropTypes.string.isRequired,
    saved: PropTypes.bool,
    likes: PropTypes.number.isRequired,
    onAction: PropTypes.func,
    isVisible: PropTypes.bool
};
OutfitToolbar.defaultProps = {
    followers: 0,
    saved: false,
    isVisible: false
};

export default OutfitToolbar;
