import React, { Component } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/fp/noop';
import get from 'lodash/fp/get';
import cn from 'classnames';
import Router from 'next/router';

import DropdownArrowIcon from '../../components/SVG/DropdownArrow';
import LinkTo from '../../components/LinkTo';
import { isTouchSupported } from '../../utils/helpers';



class Menu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoopEnabled: this.props.isLoopEnabled,
            activeItemIndex: -1,
            loopItemIndex: 0,
            activatedByAI: false
        };

        this.timeoutID = null;
        this.ref = React.createRef();
        this.listeningClickOutside = false;
        this.isTouchSupported = isTouchSupported();
    }

    componentDidMount() {
        if (this.state.isLoopEnabled && this.props.items.length > 0) {
            this.triggerActivate(this.state.loopItemIndex, true);
            this.makeLoop();
        }

        if (this.props.alwaysSelected && this.props.items.length > 0) {
            this.triggerActivate(0, true);
        }
    }

    handleMouseEnter = (e) => {
        if (this.isTouchSupported && e.type === 'mouseenter') return true;
        if (e.type === 'touchend') {
            e.preventDefault();
            if (e.target.href) {
                Router.pushRoute(e.target.href);
                this.triggerLeave(this.state.activeItemIndex);
                return true;
            } else {
                this.listenClickOutside();
            }
        }

        const itemIndex = +get('currentTarget.dataset.itemIndex', e);
        setTimeout(() => this.disableLoop());
        this.triggerActivate(itemIndex);
    };

    handleMouseLeave = (e) => {
        const itemIndex = +get('currentTarget.dataset.itemIndex', e);
        setTimeout(() => this.enableLoop());
        this.triggerLeave(itemIndex);
    };

    listenClickOutside() {
        if (!this.listeningClickOutside) {
            document.addEventListener('click', this.handleClickOutside);
            this.listeningClickOutside = true;
        }
    }

    unlistenClickOutside() {
        document.removeEventListener('click', this.handleClickOutside);
        this.listeningClickOutside = false;
    }

    handleClickOutside = (event) => {
        if (!this.ref.current.contains(event.target)) {
            this.enableLoop();
            this.triggerLeave(this.state.activeItemIndex);
            this.unlistenClickOutside();
        }
    };

    makeLoop() {
        this.timeoutID = setTimeout(() => {
            const _nextLoopIndex = this.state.loopItemIndex + 1;
            const nextLoopIndex = _nextLoopIndex >= this.props.items.length ? 0 : _nextLoopIndex;
            this.triggerActivate(nextLoopIndex, true);
            this.setState({loopItemIndex: nextLoopIndex});
            this.makeLoop();
        }, this.props.loopTimeout);
    }

    triggerActivate(index, activatedByAI) {
        this.chooseItem(index, activatedByAI);
        this.props.onActivate(index);
    }

    triggerLeave(index, activatedByAI) {
        this.chooseItem(-1, activatedByAI);
        this.props.onLeave(index);
    }

    chooseItem = (activeItemIndex = -1, activatedByAI = false) => {
        if (this.props.alwaysSelected && activeItemIndex < 0) {
            this.setState({activatedByAI: true});
            return;
        }

        this.setState({activeItemIndex, activatedByAI});
    };

    disableLoop() {
        if (this.state.isLoopEnabled) {
            this.setState({isLoopEnabled: false});
            if (this.timeoutID) {
                clearTimeout(this.timeoutID);
            }
        }
    }

    enableLoop() {
        if (!this.state.isLoopEnabled && this.props.isLoopEnabled) {
            this.setState({isLoopEnabled: this.props.isLoopEnabled});
            this.makeLoop();
        }
    }

    componentWillUnmount() {
        if (this.timeoutID) {
            clearTimeout(this.timeoutID);
        }
        this.unlistenClickOutside();
    }

    render() {
        const {items, isNested, urlBase} = this.props;
        const {activeItemIndex, activatedByAI} = this.state;

        return (
            <div
                className={cn({'site-menu': !isNested, 'site-submenu': isNested, 'is-activated-by-ai': activatedByAI})}
                ref={this.ref}
            >
                {items.map((item, index) => (
                    <div
                        key={item.id}
                        className={cn('site-menu__item', {'is-active': index === activeItemIndex})}
                        data-item-index={index}
                        onMouseEnter={this.handleMouseEnter}
                        onMouseLeave={this.handleMouseLeave}
                        onTouchEnd={this.handleMouseEnter}
                    >
                        <DropdownArrowIcon className="site-menu__icon"/>
                        {!item.categories2 && <LinkTo className="site-menu__label" to={`/${urlBase}/${item.slug}`}>{item.name}</LinkTo>}
                        {item.categories2 && <span className="site-menu__label">{item.name}</span>}
                        {item.categories2 && <Menu items={item.categories2} isNested={true} urlBase={`${urlBase}/${item.slug}`}/>}
                    </div>
                ))}
            </div>
        );
    }
}

Menu.propTypes = {
    items: PropTypes.array.isRequired,
    isLoopEnabled: PropTypes.bool,
    loopTimeout: PropTypes.number,
    urlBase: PropTypes.string,
    isNested: PropTypes.bool,
    onActivate: PropTypes.func,
    onLeave: PropTypes.func,
    alwaysSelected: PropTypes.bool
};
Menu.defaultProps = {
    isLoopEnabled: false,
    loopTimeout: 4000,
    isNested: false,
    urlBase: '',
    onActivate: noop,
    onLeave: noop,
    alwaysSelected: false
};

export default Menu;
