import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { SimpleImg } from 'react-simple-img';

import PhotoIcon from '../SVG/PhotoIcon';



const AccountAvatar = ({isVisible, img, onClick}) => (
    <div className="account-avatar" onClick={onClick}>
        { isVisible && (
            <Fragment>
                <SimpleImg
                    key={img}
                    wrapperClassName="account-avatar__img-holder"
                    placeholder="#ececec"
                    src={img}
                    animationDuration={0.3}
                />
                <div className="account-avatar__backdrop"/>
                <div className="account-avatar__camera">
                    <PhotoIcon className="account-avatar__photo-icon"/>
                </div>
                <div className="account-avatar__label">Edit/change photo</div>
            </Fragment>
        )}
    </div>
);

AccountAvatar.propTypes = {
    isVisible: PropTypes.bool,
    img: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};
AccountAvatar.defaultProps = {
    isVisible: false
};

export default AccountAvatar;
