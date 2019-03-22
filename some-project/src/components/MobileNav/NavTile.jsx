import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import noop from 'lodash/fp/noop';
import throttle from 'lodash/fp/throttle';

import LinkTo from '../LinkTo';
import { CrossIcon, ArrowIcon } from '../../components/SVG';
import { arePrimitivesDiffer } from '../../utils/helpers';
import ImgFadeIn from '../ImageFadeIn';



class NavTile extends Component {
    state = {
        showScrollTip: false,
        isScrollable: false
    };
    ref = React.createRef();

    toggleScrollTip = () => {
        const {clientHeight, scrollHeight, scrollTop} = this.ref.current;

        if ((scrollHeight - clientHeight) > scrollTop && !this.state.showScrollTip) {
            this.setState({
                showScrollTip: true,
                isScrollable: true
            });
        } else if ((scrollHeight - clientHeight) <= scrollTop && this.state.showScrollTip) {
            this.setState({showScrollTip: false});
        }
    };

    handleMenuScroll = () => {
        this.toggleScrollTip();
    };

    handleMenuScrollThrottled = throttle(100, this.handleMenuScroll);

    shouldComponentUpdate(nextProps, nextState) {
        //WARNING: Should be very careful with this check if logic of parent component will change
        return arePrimitivesDiffer(nextState, this.state) || arePrimitivesDiffer(nextProps, this.props);
    }

    componentDidUpdate(prevProps, prevState, prevContext) {
        const {isActive} = this.props;

        if (!prevProps.isActive && isActive) {
            this.toggleScrollTip();
        }
    }

    render() {
        const {image, slug, name, categories2, isActive, urlBase, openMenu, closeMenu} = this.props;
        const {isScrollable, showScrollTip} = this.state;

        const isMulti = Array.isArray(categories2) && categories2.length > 0;
        const NavItemElement = isMulti ? 'div' : LinkTo;
        const url = `/${urlBase}/${slug}`;
        const NavItemElementProps = {};

        if (isMulti) {
            NavItemElementProps.onClick = openMenu;
            NavItemElementProps['data-tile-slug'] = slug;
        }

        return (
            <NavItemElement
                className={cn('nav-tile', {'is-active': isActive && isMulti})}
                to={`/${urlBase}/${slug}`}
                {...NavItemElementProps}
            >
                <ImgFadeIn className="nav-tile__img" src={image} alt="portefini menu item"/>
                <div className="nav-tile__title">{name}</div>

                {isMulti && isActive && (
                    <div className="nav-tile__menu" onScroll={this.handleMenuScrollThrottled} ref={this.ref}>
                        {categories2.map(({id, slug, name}) => (
                            <LinkTo key={id} to={`${url}/${slug}`}>{name}</LinkTo>
                        ))}
                    </div>
                )}

                {isActive && isScrollable &&
                    <ArrowIcon className={cn('scroll-tip-icon', {'is-visible': showScrollTip})}/>
                }
                {isActive && <CrossIcon className="nav-tile__close-btn" onClick={closeMenu}/>}
            </NavItemElement>
        );
    }
}

NavTile.propTypes = {
    image: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    urlBase: PropTypes.string.isRequired,
    categories2: PropTypes.array,
    isActive: PropTypes.bool,
    openMenu: PropTypes.func,
    closeMenu: PropTypes.func
};
NavTile.defaultProps = {
    categories2: [],
    isActive: false,
    openMenu: noop,
    closeMenu: noop
};

export default NavTile;
