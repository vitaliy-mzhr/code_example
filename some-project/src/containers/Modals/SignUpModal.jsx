import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import noop from 'lodash/fp/noop';

// Actions
import { mapRoutineCreators } from '../../actions/actionRoutines';
import { signup } from '../../actions';
// Components
import Modal, { closeAllModals } from '../../components/Modal';
import LinkTo from '../../components/LinkTo';
import ArrowIcon from '../../components/SVG/ArrowIcon';
import SignUpContent from '../../components/SignUpContent';
// HOC
import withAuthModal from '../../HOC/withAuthModal';
import { AUTH_MODAL_TYPES } from '../../config';



class SignUpModal extends Component {
    handleSubmit = values => {
        this.props.signup.trigger({ ...values, onSuccessFn: closeAllModals });
    };

    render() {
        const {title, subtitle, onClose, openNextModal} = this.props;

        return (
            <Modal onClose={onClose} className="auth-modal">
                <Modal.Header className="auth-modal__header">
                    <h2>{title}</h2>
                    <p>{subtitle}</p>
                </Modal.Header>

                <Modal.Body className="auth-modal__body">
                    <SignUpContent handleSubmit={this.handleSubmit}/>
                </Modal.Body>

                <Modal.Footer className="auth-modal__footer">
                    <div>
                        Already have an account?
                        <LinkTo
                            to="/signin"
                            className="auth-modal__footer-link"
                            data-modal={AUTH_MODAL_TYPES.SIGNIN}
                            onClick={openNextModal}
                        >
                            Sign in
                            <ArrowIcon className="auth-modal__arrow-icon"/>
                        </LinkTo>
                    </div>
                    <p>By signing up or signing in, I acknowlege and agree to Portefini's Terms of Use and Privacy Policy</p>
                </Modal.Footer>
            </Modal>
        );
    }
}

SignUpModal.propTypes = {
    title: PropTypes.string.isRequired,
    openNextModal: PropTypes.func.isRequired,
    onClose: PropTypes.func,
    subtitle: PropTypes.string
};
SignUpModal.defaultProps = {
    subtitle: '',
    onClose: noop
};

export default compose(
    withAuthModal,
    connect(null, mapRoutineCreators({ signup }))
)(SignUpModal);
