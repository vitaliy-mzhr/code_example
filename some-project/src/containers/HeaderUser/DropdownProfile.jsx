import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import LinkTo from '../../components/LinkTo';
import { SignOutIcon } from '../../components/SVG';



const DropdownProfile = ({isOn, closeDropdown, logout, photo, name, menu, menuCallbacks, activeNavId}, ref) => (
    <div className={cn('dropdown-profile', {'is-visible': isOn})} onMouseLeave={closeDropdown} ref={ref}>
        <div className="dropdown-profile__inner">
            <div className="user-info">
                <div className="user-info__avatar">
                    <img src={photo} alt="avatar"/>
                </div>
                <div className="user-info__data">
                    <div className="user-info__title">Your Account</div>
                    <div className="user-info__name">{name}</div>
                </div>
            </div>

            <div className="dropdown-profile__nav">
                <LinkTo to="/my-info" onClick={closeDropdown}>My Info</LinkTo>
                <i>My Lybrary:</i>
                <LinkTo to="/my-clothes" onClick={closeDropdown}>My Clothes</LinkTo>
                <LinkTo to="/my-outfits" onClick={closeDropdown}>My Outfits</LinkTo>
                <LinkTo to="/my-collections" onClick={closeDropdown}>My Collections</LinkTo>
                <LinkTo to="/my-stylists" onClick={closeDropdown}>My Stylists</LinkTo>
            </div>

            <div className="dropdown-profile__signout">
                <span onClick={logout}>
                    <SignOutIcon/> Sign out
                </span>
            </div>
        </div>
    </div>
);

const RefDropdownProfile = React.forwardRef(DropdownProfile);

RefDropdownProfile.propTypes = {
    closeDropdown: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    photo: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    isOn: PropTypes.bool
};
RefDropdownProfile.defaultProps = {
    isOn: false
};

export default RefDropdownProfile;
