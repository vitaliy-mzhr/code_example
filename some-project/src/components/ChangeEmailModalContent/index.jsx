import React, { Component, Fragment } from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';

// Components
import RenderInput from '../../components/renderInput';
// CONFIG
import FORMS from '../../config/forms';
// Utils
import { email, required } from '../../utils/validators';



class ChangeEmailModalContent extends Component {
    render() {
        const { currentEmail, onClose, error, handleSubmit, pristine, submitting, invalid } = this.props;

        return (
            <Fragment>
                <form onSubmit={handleSubmit} className="user-profile-modal-content">
                    <div className="user-profile-modal-content__input-row">
                        <label>Current Email:</label>
                        <span>{currentEmail}</span>
                    </div>

                    <div className="user-profile-modal-content__input-row">
                        <label>New Email:</label>
                        <Field
                            id="change-email"
                            name="email"
                            type="email"
                            placeholder="Email address"
                            component={RenderInput}
                            validate={[required, email]}
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

ChangeEmailModalContent.propTypes = {
    currentEmail: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    onClose: PropTypes.func
};

export default reduxForm({ form: FORMS.CHANGE_EMAIL })(ChangeEmailModalContent);
