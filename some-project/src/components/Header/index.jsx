import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import get from 'lodash/fp/get';
import Router, { withRouter } from 'next/router';
import cn from 'classnames';

import SiteNav from '../../components/Nav/SiteNav';
import DropdownNav from '../../components/Nav/DropdownNav';
import { mapRoutineCreators } from '../../actions/actionRoutines';
import { getMenu } from '../../actions';
import HeaderLogo from './HeaderLogo';
import HeaderUser from '../../containers/HeaderUser';
import MobileNav from '../MobileNav';
import HamburgerBtn from '../HamburgerBtn';
import withWindowScrollObserver from '../../HOC/withWindowScrollObserver';
import OutfitHeaderBtn from '../OutfitHeaderBtn';



const dropdownRef = React.createRef();

class Header extends Component {
    state = {
        dropdownVisible: false,
        mobileNavVisible: false,
        activeNavId: null,
        activeImage: ''
    };

    componentDidMount() {
        const {getMenu} = this.props;

        getMenu.trigger();
        Router.events.on('routeChangeComplete', this.closeAllNav);
        Router.events.on('routeChangeError', this.closeAllNav);

        if (get('router.route', this.props) === '/outfit') {
            document.documentElement.classList.add('hide-scroll');
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.router.route !== this.props.router.route) {
            if (this.props.router.route === '/outfit') {
                document.documentElement.classList.add('hide-scroll');
            } else if (prevProps.router.route === '/outfit') {
                document.documentElement.classList.remove('hide-scroll');
            }
        }
    }

    componentWillUnmount() {
        Router.events.off('routeChangeComplete', this.closeAllNav);
        Router.events.off('routeChangeError', this.closeAllNav);
    }

    _toggleDropdown = (val) => (e) => {
        if (e.relatedTarget && val === false) {
            if ((e.relatedTarget === window ||
                !get('dropdownRef.current.contains') ||
                !dropdownRef.current.contains(e.relatedTarget)) &&
                (!get('relatedTarget.classList.contains', e) || !e.relatedTarget.classList.contains('site-nav'))
            ) {
                this.setState({dropdownVisible: false, activeNavId: null});
            }
        } else {
            const currentTarget = e.currentTarget;
            this.setState((prevState) => {
                const dropdownVisible = val !== undefined ? val : !prevState.dropdownVisible;
                const navId = currentTarget.dataset.navId;
                return ({
                    dropdownVisible,
                    activeNavId: dropdownVisible && navId ? navId : prevState.activeNavId
                });
            });
        }
    };

    openDropdown = this._toggleDropdown(true);
    closeDropdown = this._toggleDropdown(false);

    onMenuActivate = (index) => {
        const {activeNavId} = this.state;
        const activeImage = get(`menu.items[${activeNavId}][${index}].api_img_web.width_600`, this.props);
        this.setState({activeImage});
    };

    toggleMobileNav = () => {
        this.setState(({mobileNavVisible}) => ({mobileNavVisible: !mobileNavVisible}));
    };

    closeAllNav = () => {
        this.setState({dropdownVisible: false, activeNavId: null, mobileNavVisible: false});
    };

    render() {
        const {menu, isScrollPassedTarget, router} = this.props;
        const {activeNavId, dropdownVisible, activeImage, mobileNavVisible} = this.state;

        return (
            <header className={cn('site-header', {'is-flat': !isScrollPassedTarget})}>
                <div className="site-header__inner">
                    {router.route === '/outfit' && <OutfitHeaderBtn/>}
                    {router.route !== '/outfit' &&
                        <HamburgerBtn isOn={mobileNavVisible} onClick={this.toggleMobileNav}/>
                    }
                    <HeaderLogo/>
                    <SiteNav closeDropdown={this.closeDropdown} openDropdown={this.openDropdown} activeNavId={activeNavId}/>
                    <HeaderUser/>
                </div>

                <DropdownNav
                    isOn={dropdownVisible}
                    closeDropdown={this.closeDropdown}
                    ref={dropdownRef}
                    menu={menu.items}
                    activeNavId={activeNavId}
                    menuCallbacks={{
                        onActivate: this.onMenuActivate
                    }}
                    activeImage={activeImage}
                />

                <MobileNav isOn={mobileNavVisible} menu={menu.items} optimizeMount/>
            </header>
        );
    }
}

function mapStateToProps({menu}) {
    return {menu};
}

export default compose(
    withRouter,
    withWindowScrollObserver(50, '/', true, false),
    connect(mapStateToProps, mapRoutineCreators({getMenu}))
)(Header);
