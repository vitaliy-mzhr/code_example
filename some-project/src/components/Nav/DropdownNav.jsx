import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Menu from '../../containers/Menu';
import { SITE_CATEGORIES } from '../../config';
import ImageSwitcher from '../ImageSwitcher';



const DropdownNav = ({isOn, closeDropdown, menu, menuCallbacks, activeNavId, activeImage}, ref) => (
    <div className={cn('dropdown-nav', {'is-visible': isOn})} onMouseLeave={closeDropdown} ref={ref}>
        <div className="dropdown-nav__menu-wrapper">
            {Object.entries(menu).map(([menuId, menuEntries]) => (
                <div key={menuId} className={cn('dropdown-nav__menu', {'is-visible': activeNavId === menuId})}>
                    {activeNavId === menuId &&
                        <Menu
                            urlBase={SITE_CATEGORIES[menuId].toLowerCase()}
                            items={menuEntries}
                            alwaysSelected
                            {...menuCallbacks}
                        />
                    }
                </div>
            ))}
        </div>
        <div className="dropdown-nav__image-wrapper">
            {activeImage && <ImageSwitcher image={activeImage}/>}
        </div>
    </div>
);

const RefDropdownNav = React.forwardRef(DropdownNav);

RefDropdownNav.propTypes = {
    closeDropdown: PropTypes.func.isRequired,
    activeImage: PropTypes.string,
    isOn: PropTypes.bool,
    menu: PropTypes.object,
    menuCallbacks: PropTypes.shape({
        onActivate: PropTypes.func,
        onLeave: PropTypes.func
    }),
};
RefDropdownNav.defaultProps = {
    activeImage: '',
    isOn: false,
    menuCallbacks: {},
    menu: {}
};

export default RefDropdownNav;
