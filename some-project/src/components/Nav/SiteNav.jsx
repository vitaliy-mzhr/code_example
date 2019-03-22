import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { SITE_CATEGORIES } from '../../config';



const SiteNav = ({closeDropdown, openDropdown, activeNavId}) => (
    <div className="site-nav" onMouseLeave={closeDropdown}>
        {Object.entries(SITE_CATEGORIES).map(([navId, navLabel]) => (
            <div
                key={navId}
                data-nav-id={navId}
                className={cn('site-nav__link', {'is-active': activeNavId === navId})}
                onMouseEnter={openDropdown}
            >
                <span>{navLabel}</span>
            </div>
        ))}
    </div>
);

SiteNav.propTypes = {
    closeDropdown: PropTypes.func.isRequired,
    openDropdown: PropTypes.func.isRequired,
    activeNavId: PropTypes.string
};
SiteNav.defaultProps = {
    activeNavId: ''
};

export default SiteNav;
