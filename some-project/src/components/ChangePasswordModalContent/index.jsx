import React, { Component, Fragment } from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';

// Components
import RenderInput from '../../components/renderInput';
// CONFIG
import FORMS from '../../config/forms';
// Utils
import { required, passwordLength, validatePasswords } from '../../utils/validators';



class ChangePasswordModalContent extends Component {
    render() {
        const { currentEmail, onClose, error, handleSubmit, pristine, submitting, invalid } = this.props;

        return (
            <Fragment>
                <form onSubmit={handleSubmit} className="user-profile-modal-content">
                    <div className="user-profile-modal-content__input-row">
                        <label>Email:</label>
                        <span>{currentEmail}</span>
                    </div>

                    <div className="user-profile-modal-content__input-row">
                        <label>New Password:</label>
                        <Field
                            id="change-password1"
                            name="password1"
                            type="password"
                            placeholder="Minimum 6 characters"
                            component={RenderInput}
                            validate={[required, passwordLength]}
                        />
                    </div>

                    <div className="user-profile-modal-content__input-row">
                        <label>Verify New Password:</label>
                        <Field
                            id="change-password2"
                            name="password2"
                            type="password"
                            placeholder="Type new password again"
                            component={RenderInput}
                            validate={[required]}
                        />
                    </div>

                    <div className="user-profile-modal-content__btn-container">
                        <button
                            className="btn user-profile-modal-content__btn user-profile-modal-content__btn-cancel"
                            type="button"
                            onClick={onClose}
                        >
                            Cancel
                        </button>

                        <button
                            className="btn btn__inverted user-profile-modal-content__btn user-profile-modal-content__btn-update"
                            type="submit"
                            disabled={pristine || submitting || invalid}
                        >
                            Update
                        </button>
                    </div>
                </form>

                {error && <div className="user-profile-modal-content__error-message">{error}</div>}
            </Fragment>
        );
    }
}

ChangePasswordModalContent.propTypes = {
    currentEmail: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    onClose: PropTypes.func
};

export default reduxForm({ form: FORMS.CHANGE_PASSWORD, validate: validatePasswords })(ChangePasswordModalContent);
