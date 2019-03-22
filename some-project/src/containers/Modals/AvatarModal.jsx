import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import noop from 'lodash/fp/noop';

// Actions
import { mapRoutineCreators } from '../../actions/actionRoutines';
import { updateUserAvatar } from '../../actions';
// Components
import Modal, { closeAllModals } from '../../components/Modal';
import AvatarModalContent from '../../components/AvatarModalContent';



class AvatarModal extends Component {
    newAvatar = null;

    onChangeAvatar = (image) => {
        this.newAvatar = image;
    }

    saveAvatar = () => {
        this.props.updateUserAvatar.trigger({ image: this.newAvatar, onSuccessFn: closeAllModals });
    };

    render() {
        const {onClose, user: { photo }} = this.props;

        return (
            <Modal onClose={onClose} className="avatar-modal">
                <Modal.Header>Your Profile Photo</Modal.Header>

                <Modal.Body className="avatar-modal__body">
                    <div className="avatar-modal__container">
                        <AvatarModalContent userPhoto={photo} onChangeAvatar={this.onChangeAvatar}/>
                    </div>
                </Modal.Body>

                <Modal.Footer className="avatar-modal__footer">
                    <div className="avatar-modal__container">
                        <div className="avatar-modal__footer-inner">
                            <button
                                className="btn avatar-modal__btn avatar-modal__btn-cancel"
                                type="button"
                                onClick={onClose}
                            >
                                Cancel
                            </button>

                            <button
                                className="btn btn__inverted avatar-modal__btn avatar-modal__btn-update"
                                type="button"
                                onClick={this.saveAvatar}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </Modal.Footer>
            </Modal>
        );
    }
}

AvatarModal.propTypes = {
    onClose: PropTypes.func
};
AvatarModal.defaultProps = {
    onClose: noop
};

function mapStateToProps({ auth: { user } }) {
    return { user };
}

export default connect(mapStateToProps, mapRoutineCreators({ updateUserAvatar }))(AvatarModal);
