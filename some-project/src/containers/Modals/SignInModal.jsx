import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import noop from 'lodash/fp/noop';

// Actions
import { mapRoutineCreators } from '../../actions/actionRoutines';
import { login } from '../../actions';
// Components
import Modal, { closeAllModals } from '../../components/Modal';
import LinkTo from '../../components/LinkTo';
import ArrowIcon from '../../components/SVG/ArrowIcon';
import SignInContent from '../../components/SignInContent';
// HOC
import withAuthModal from '../../HOC/withAuthModal';
import { AUTH_MODAL_TYPES } from '../../config';



class SignUpModal extends Component {
    handleSubmit = values => {
        this.props.login.trigger({ ...values, onSuccessFn: closeAllModals });
    };

    render() {
        const {onClose, openNextModal} = this.props;

        return (
            <Modal onClose={onClose} className="auth-modal">
                <Modal.Header className="auth-modal__header">Welcome back to Portefini</Modal.Header>

                <Modal.Body className="auth-modal__body">
                    <SignInContent handleSubmit={this.handleSubmit}/>
                </Modal.Body>

                <Modal.Footer className="auth-modal__footer">
                    <div>
                        Don't have an account yet?
                        <LinkTo
                            to="/signup"
                            className="auth-modal__footer-link"
                            data-modal={AUTH_MODAL_TYPES.SIGNUP}
                            onClick={openNextModal}
                        >
                            Join now
                            <ArrowIcon className="auth-modal__arrow-icon"/>
                        </LinkTo>
                    </div>
                    <p>
                        By signing up or signing in, I acknowlege and agree to Portefini's Terms of Use and Privacy
                        Policy
                    </p>
                </Modal.Footer>
            </Modal>
        );
    }
}

SignUpModal.propTypes = {
    openNextModal: PropTypes.func.isRequired,
    onClose: PropTypes.func
};
SignUpModal.defaultProps = {
    onClose: noop
};

export default compose(
    withAuthModal,
    connect(null, mapRoutineCreators({ login }))
)(SignUpModal);
