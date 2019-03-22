import React, { Component } from 'react';
import get from 'lodash/fp/get';
import PropTypes from 'prop-types';



const withAuthModal = (BaseComponent) => {
    const displayName = BaseComponent.displayName || BaseComponent.name || 'Component';

    return class extends Component {
        static displayName = `withIntersectionObserver(${displayName})`;

        static propTypes = {
            changeModal: PropTypes.func.isRequired
        };

        openNextModal = (e) => {
            e.preventDefault();

            const modalType = get('currentTarget.dataset.modal', e) || '';
            if (modalType) {
                this.props.changeModal(modalType);
            }
        };

        render() {
            const {changeModal, ...rest} = this.props;

            return (
                <BaseComponent {...rest} openNextModal={this.openNextModal}/>
            );
        }
    };
};

export default withAuthModal;
