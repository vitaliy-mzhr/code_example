import React, { Component } from 'react';
import { withRouter } from 'next/router';
import throttle from 'lodash/fp/throttle';

import { scrollbarVisible } from '../utils/helpers';



const withWindowScrollObserver = (windowScrollThreshold = null, windowScrollPage = null, initial = false, initialPageState = false) => (BaseComponent) => {
    const displayName = BaseComponent.displayName || BaseComponent.name || 'Component';

    class BaseComponentWrapper extends Component {
        static displayName = `withWindowScrollObserver(${displayName})`;
        static defaultProps = {
            windowScrollThreshold: null,
            windowScrollPage: null
        };

        state = {
            isPassedThreshold: windowScrollPage && this.props.router.asPath === windowScrollPage ? initialPageState : initial
        };
        ticking = false;
        isListening = false;

        getScrollTarget = () => {
            if (this.props.windowScrollThreshold) {
                return this.props.windowScrollThreshold;
            }
            return windowScrollThreshold;
        };

        getWindowScrollPage = () => {
            if (this.props.windowScrollPage) {
                return this.props.windowScrollPage;
            }
            return windowScrollPage;
        };

        componentDidMount() {
            const {router} = this.props;
            const scrollTarget = this.getScrollTarget();
            const scrollPage = this.getWindowScrollPage();

            if (scrollTarget && (!scrollPage || router.asPath === scrollPage) && !this.isListening) {
                this.handleScrollCheck(window.pageYOffset);
                window.addEventListener('scroll', this.listenWindowScrollThrottled);
                this.isListening = true;
            }
        }

        componentDidUpdate(prevProps) {
            const {router} = this.props;

            if (prevProps.router.asPath === router.asPath) {
                return;
            }

            const scrollTarget = this.getScrollTarget();
            const scrollPage = this.getWindowScrollPage();

            if (scrollTarget && (!scrollPage || router.asPath === scrollPage) && !this.isListening) {
                this.handleScrollCheck(window.pageYOffset);
                window.addEventListener('scroll', this.listenWindowScrollThrottled);
                this.isListening = true;
            } else {
                this.handleScrollCheck(null, initial);
                window.removeEventListener('scroll', this.listenWindowScrollThrottled);
                this.isListening = false;
            }
        }

        componentWillUnmount() {
            window.removeEventListener('scroll', this.listenWindowScrollThrottled);
            this.isListening = false;
        }

        _listenWindowScroll = () => {
            const lastKnownScrollPosition = window.pageYOffset;

            if (!this.ticking) {
                requestAnimationFrame(() => {
                    this.handleScrollCheck(lastKnownScrollPosition);
                    this.ticking = false;
                });
                this.ticking = true;
            }
        };
        listenWindowScrollThrottled = throttle(100, this._listenWindowScroll);

        handleScrollCheck = (topOffset, forcePassed) => {
            if (forcePassed !== undefined ) {
                if (this.state.isPassedThreshold !== forcePassed) this.setState({isPassedThreshold: forcePassed});
                return;
            }

            const scrollTarget = this.getScrollTarget();
            if (((topOffset < scrollTarget) || !scrollbarVisible(document.documentElement)) && this.state.isPassedThreshold) {
                this.setState({isPassedThreshold: false});
            } else if (topOffset >= scrollTarget && !this.state.isPassedThreshold) {
                this.setState({isPassedThreshold: true});
            }
        };

        render() {
            return <BaseComponent {...this.props} isScrollPassedTarget={this.state.isPassedThreshold}/>;
        }
    }

    return withRouter(BaseComponentWrapper);
};

export default withWindowScrollObserver;
