import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';

// Components
import RenderInput from '../../components/renderInput';
import { ArrowIcon } from '../../components/SVG';
import LinkTo from '../../components/LinkTo';
// CONFIG
import FORMS from '../../config/forms';
// Utils
import { email, required } from '../../utils/validators';



class SignInForm extends Component {
    render() {
        const { error, handleSubmit, pristine, submitting, invalid } = this.props;

        return (
            <form onSubmit={handleSubmit} className="auth-form">
                <div className="auth-form__input-row">
                    <label htmlFor="signin-email">Email:</label>
                    <Field
                        id="signin-email"
                        name="email"
                        type="email"
                        placeholder="Email address"
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
                        validate={[required]}
                    />
                </div>

                <button className="btn btn__inverted auth-form__btn" type="submit" disabled={pristine || submitting || invalid}>
                    Sign In
                </button>

                <LinkTo to="/reset-password" className="auth-form__reset-password">
                    Forgot your username or password?
                    <ArrowIcon className="auth-form__arrow-icon"/>
                </LinkTo>

                {error && <p className="auth-form__error-message">{error}</p>}
            </form>
        );
    }
}

SignInForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired
};

export default reduxForm({ form: FORMS.LOGIN })(SignInForm);
