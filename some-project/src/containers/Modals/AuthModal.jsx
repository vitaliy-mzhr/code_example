import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import SignUpModal from './SignUpModal';
import SignInModal from './SignInModal';
import { closeAllModals } from '../../components/Modal';
import { closeAuthModal, openAuthModal } from '../../actions';
import { AUTH_MODAL_TYPES } from '../../config';



class AuthModal extends Component {
    changeModal = (type) => {
        closeAllModals(() => {
            this.props.closeAuthModal();
            this.props.openAuthModal({type});
        });
    };

    closeModal = () => {
        this.props.closeAuthModal();
    };

    render() {
        const {title, type, subtitle, isOpen} = this.props;

        if (!isOpen) return null;

        return (
            <Fragment>
                {type === AUTH_MODAL_TYPES.SIGNUP &&
                    <SignUpModal onClose={this.closeModal} changeModal={this.changeModal} title={title} subtitle={subtitle}/>
                }

                {type === AUTH_MODAL_TYPES.SIGNIN &&
                    <SignInModal onClose={this.closeModal} changeModal={this.changeModal}/>
                }
            </Fragment>
        );
    }
}

function mapStateToProps({authModal}) {
    return {...authModal};
}

export default connect(mapStateToProps, {openAuthModal, closeAuthModal})(AuthModal);
