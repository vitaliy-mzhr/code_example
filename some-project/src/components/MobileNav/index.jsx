import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import get from 'lodash/fp/get';

import { SITE_CATEGORIES } from '../../config';
import NavTile from './NavTile';
import MobileNavBottom from './MobileNavBottom';



class MobileNav extends Component {
    state = {
        activeSubMenu: ''
    };

    openSubMenu = (e) => {
        const activeSubMenu = get('currentTarget.dataset.tileSlug', e) || '';
        this.setState({
            activeSubMenu
        });
    };

    closeSubMenu = (e) => {
        this.setState({activeSubMenu: ''});
        e.stopPropagation();
    };

    componentDidUpdate(prevProps, prevState, prevContext) {
        const {isOn} = this.props;

        if (!prevProps.isOn && isOn) {
            document.documentElement.classList.add('hide-scroll');
        } else if (prevProps.isOn && !isOn) {
            document.documentElement.classList.remove('hide-scroll');
        }
    }

    componentWillUnmount() {
        document.documentElement.classList.remove('hide-scroll');
    }

    render() {
        let {isOn, menu, optimizeMount} = this.props;

        return (
            <div className={cn('mobile-menu', {'is-visible': isOn})}>
                {(!optimizeMount || (optimizeMount && isOn)) && Object.entries(SITE_CATEGORIES).map(([menuId, menuTitle]) => (
                    <section key={menuId}>
                        <div className="mobile-menu__title">{menuTitle}</div>

                        <div className="mobile-menu__items">
                            {menu[menuId] && menu[menuId].map(({id, api_img_web, slug, name, categories2}) => (
                                <NavTile
                                    key={id}
                                    urlBase={SITE_CATEGORIES[menuId].toLowerCase()}
                                    isActive={this.state.activeSubMenu === slug}
                                    image={api_img_web.width_600}
                                    slug={slug}
                                    name={name}
                                    categories2={categories2}
                                    openMenu={this.openSubMenu}
                                    closeMenu={this.closeSubMenu}
                                />
                            ))}
                        </div>
                    </section>
                ))}

                <MobileNavBottom/>
            </div>
        );
    }
}

MobileNav.propTypes = {
    isOn: PropTypes.bool.isRequired,
    menu: PropTypes.object.isRequired,
    optimizeMount: PropTypes.bool
};
MobileNav.defaultProps = {
    optimizeMount: false
};

export default MobileNav;
