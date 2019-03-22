import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import noop from 'lodash/fp/noop';
import cn from 'classnames';
import PubSub from 'pubsub-js';
import Router from 'next/router';

import CrossIcon from '../SVG/CrossIcon';
import { CLOSE_MODAL_EVENT } from '../../config';



const ModalContext = React.createContext();
export const closeAllModals = (customOnClose) => (PubSub.publish(CLOSE_MODAL_EVENT, customOnClose));


class Modal extends Component {
    constructor(props) {
        super(props);

        this.el = document.querySelector('.modal');
        this.customOnClose = null;
        this.pubSubToken = PubSub.subscribe(CLOSE_MODAL_EVENT, this.closeModal);

        this.provider = {close: this.closeModal};
        this.state = {isOpened: false};
    }

    closeModal = (e, customOnClose = null) => {
        this.customOnClose = customOnClose;
        this.setState({isOpened: false});
    };

    onRouteChange = () => {
        this.closeModal();
    };

    componentDidMount() {
        setTimeout(() => this.setState({isOpened: true}));
        Router.events.on('routeChangeStart', this.onRouteChange);
        document.documentElement.classList.add('modal-active');
    }

    componentWillUnmount() {
        document.documentElement.classList.remove('modal-active');
        this.customOnClose = null;
        PubSub.unsubscribe(this.pubSubToken);
        Router.events.off('routeChangeStart', this.onRouteChange);
    }

    handleBackdropTransition = () => {
        if (!this.state.isOpened) {
            this.customOnClose ? this.customOnClose() : this.props.onClose();
            this.customOnClose = null;
        }
    };

    render() {
        const {className, children} = this.props;

        return ReactDOM.createPortal(
            <Fragment>
                <div className={cn('modal__inner', className, {'is-open': this.state.isOpened})}>
                    <div className="modal__content">
                        <ModalContext.Provider value={this.provider}>
                            {children}
                        </ModalContext.Provider>
                    </div>
                </div>

                <div
                    className="modal__backdrop"
                    onClick={this.closeModal}
                    onTransitionEnd={this.handleBackdropTransition}
                />
            </Fragment>,
            this.el
        );
    }

    static Header = ({children, className}) => (
        <ModalContext.Consumer>
            {({close}) => (
                <div className={cn('modal__header', className)}>
                    {children}
                    <div className="modal__close" onClick={close}>
                        <CrossIcon/>
                        <span>close</span>
                    </div>
                </div>
            )}
        </ModalContext.Consumer>
    );

    static Body = ({children, className}) => (
        <div className={`modal__body ${className}`}>
            {children}
        </div>
    );

    static Footer = ({children, className}) => (
        <div className={`modal__footer ${className}`}>
            {children}
        </div>
    );
}

Modal.propTypes = {
    onClose: PropTypes.func
};
Modal.defaultProps = {
    onClose: noop
};

export default Modal;
