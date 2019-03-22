import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import noop from 'lodash/fp/noop';

// Actions
import { mapRoutineCreators } from '../../actions/actionRoutines';
import { updateUserEmail, updateUserPassword } from '../../actions';
// Components
import Modal, { closeAllModals } from '../../components/Modal';
import ChangeEmailModalContent from '../../components/ChangeEmailModalContent';
import ChangePasswordModalContent from '../../components/ChangePasswordModalContent';



class UserProfileModal extends Component {
    handleSubmitEmail = values => {
        this.props.updateUserEmail.trigger({ values, onSuccessFn: closeAllModals });
    };

    handleSubmitPassword = values => {
        this.props.updateUserPassword.trigger({ values, onSuccessFn: closeAllModals });
    };

    render() {
        const {onClose, type, user} = this.props;

        return (
            <Modal onClose={onClose} className="user-profile-modal">
                <Modal.Header>
                    {type === 'password' ? 'Change Password' : 'Change Email'}
                </Modal.Header>

                <Modal.Body className="user-profile-modal__body">
                    {type === 'password' ?
                        <ChangePasswordModalContent onSubmit={this.handleSubmitPassword} onClose={onClose} currentEmail={user.email}/> :
                        <ChangeEmailModalContent onSubmit={this.handleSubmitEmail} onClose={onClose} currentEmail={user.email}/>
                    }
                </Modal.Body>

                <Modal.Footer className="user-profile-modal__footer">
                    Please keep in mind that all further Portefini notifications will be sent to your new email address.
                </Modal.Footer>
            </Modal>
        );
    }
}

UserProfileModal.propTypes = {
    type: PropTypes.oneOf(['email', 'password']).isRequired,
    onClose: PropTypes.func
};
UserProfileModal.defaultProps = {
    onClose: noop
};

function mapStateToProps({ auth: { user } }) {
    return { user };
}

export default connect(
    mapStateToProps,
    mapRoutineCreators({ updateUserEmail, updateUserPassword })
)(UserProfileModal);
