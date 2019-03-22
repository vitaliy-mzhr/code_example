import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';

// Components
import RenderInput from '../../components/renderInput';
// CONFIG
import FORMS from '../../config/forms';
// Utils
import { email, required, passwordLength } from '../../utils/validators';



class SignUpForm extends Component {
    render() {
        const { error, handleSubmit, pristine, submitting, invalid } = this.props;

        return (
            <form onSubmit={handleSubmit} className="auth-form">
                <div className="auth-form__input-row">
                    <label htmlFor="firstName">First name:</label>
                    <Field
                        id="firstName"
                        name="first_name"
                        type="text"
                        placeholder="FirstName"
                        component={RenderInput}
                        validate={[required]}
                    />
                </div>

                <div className="auth-form__input-row">
                    <label htmlFor="signup-email">Email:</label>
                    <Field
                        id="signup-email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        component={RenderInput}
                        validate={[required, email]}
                    />
                </div>

                <div className="auth-form__input-row">
                    <label htmlFor="password">Password:</label>
                    <Field
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Minimum 6 characters"
                        component={RenderInput}
                        validate={[required, passwordLength]}
                    />
                </div>

                <button className="btn btn__inverted auth-form__btn" type="submit" disabled={pristine || submitting || invalid}>
                    Sign Up
                </button>

                {error && <p className="auth-form__error-message">{error}</p>}
            </form>
        );
    }
}

SignUpForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired
};

export default reduxForm({ form: FORMS.SIGN_UP })(SignUpForm);
