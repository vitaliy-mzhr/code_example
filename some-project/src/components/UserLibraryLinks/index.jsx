import React, { Fragment } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

// Components
import LinkTo from '../LinkTo';
// Config
import ROUTES_CONFIG from '../../config/routes-config.json';



const UserLibraryLinks = ({ className, route }) => (
    <Fragment>
        <LinkTo to="/my-clothes" className={cn(className, { 'is-active': route === ROUTES_CONFIG.MY_CLOTHES.page})}>
            My Clothes
        </LinkTo>
        <LinkTo to="/my-outfits" className={cn(className, { 'is-active': route === ROUTES_CONFIG.MY_OUTFITS.page})}>
            My Outfits
        </LinkTo>
        <LinkTo to="/my-collections" className={cn(className, { 'is-active': route === ROUTES_CONFIG.MY_COLLECTIONS.page})}>
            My Collections
        </LinkTo>
        <LinkTo to="/my-stylists" className={cn(className, { 'is-active': route === ROUTES_CONFIG.MY_STYLISTS.page})}>
            My Stylists
        </LinkTo>
    </Fragment>
);

UserLibraryLinks.propTypes = {
    className: PropTypes.string.isRequired,
    route: PropTypes.string.isRequired
};

export default UserLibraryLinks;
