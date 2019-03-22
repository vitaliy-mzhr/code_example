import React, { Component } from 'react';
import throttle from 'lodash/fp/throttle';
import { withRouter } from 'next/router';

import { withDimensionObserver } from '../context/Dimension';



const withScrollOverObserver = (elementListener, elementTarget, offset = 0, maxDimensionXToListen = null, returnListenerCoords = false) => (BaseComponent) => {
    const displayName = BaseComponent.displayName || BaseComponent.name || 'Component';

    class BaseComponentWrapper extends Component {
        static displayName = `withScrollOverObserver(${displayName})`;

        state = {
            isPassedTarget: false
        };
        ticking = false;
        isListening = false;
        target = null;
        elListener = null;
        listenerCoords = null;

        getElementTarget = () => {
            return document.querySelector(elementTarget);
        };

        getElementListener = () => {
            return document.querySelector(elementListener);
        };

        componentDidMount() {
            this.target = this.getElementTarget();
            this.elListener = this.getElementListener();

            if (!this.isListening && this.target && this.elListener && this.isInTargetDimension()) {
                this.bindListener();
            }
        }

        isRouteChanged(prevProps) {
            return (prevProps.router.route !== this.props.router.route);
        }

        isDimensionChanged(prevProps) {
            return (this.props.vw !== prevProps.vw || this.props.vh !== prevProps.vh);
        }

        isInTargetDimension() {
            return (!maxDimensionXToListen || maxDimensionXToListen >= this.props.vw);
        }

        destroyListener() {
            if (this.isListening) {
                window.removeEventListener('scroll', this.listenWindowScrollThrottled);
                this.isListening = false;
            }
        }

        bindListener() {
            this.listenerCoords = this.elListener.getBoundingClientRect();
            this.handleScrollCheck();

            if (!this.isListening) {
                window.addEventListener('scroll', this.listenWindowScrollThrottled);
                this.isListening = true;
            }
        }

        componentDidUpdate(prevProps) {
            if (this.isRouteChanged(prevProps)) {
                this.target = this.getElementTarget();
                this.elListener = this.getElementListener();

                if (this.target && this.elListener && this.isInTargetDimension()) {
                    this.bindListener();
                } else  {
                    this.destroyListener();
                }

                return;
            }

            if (this.isDimensionChanged(prevProps) && this.isInTargetDimension() && this.target && this.elListener) {
                this.bindListener();
            } else if (!this.isInTargetDimension()) {
                this.destroyListener();
            }
        }

        componentWillUnmount() {
            this.destroyListener();
        }

        _listenWindowScroll = () => {
            if (!this.ticking) {
                requestAnimationFrame(() => {
                    this.handleScrollCheck();
                    this.ticking = false;
                });
                this.ticking = true;
            }
        };
        listenWindowScrollThrottled = throttle(100, this._listenWindowScroll);

        handleScrollCheck = (forcePassed) => {
            if (forcePassed !== undefined ) {
                if (this.state.isPassedTarget !== forcePassed) this.setState({isPassedTarget: forcePassed});
                return;
            }

            const targetTop = this.target.getBoundingClientRect().top;
            if ((this.listenerCoords.top + this.listenerCoords.height) >= targetTop - offset) {
                if (!this.state.isPassedTarget) this.setState({isPassedTarget: true});
            } else {
                if (this.state.isPassedTarget) this.setState({isPassedTarget: false});
            }
        };

        render() {
            const additionalParams = returnListenerCoords ? {listenerCoords: this.listenerCoords} : {};
            return <BaseComponent {...this.props} isScrolledOver={this.state.isPassedTarget} {...additionalParams}/>;
        }
    }

    return withRouter(withDimensionObserver(BaseComponentWrapper));
};

export default withScrollOverObserver;
