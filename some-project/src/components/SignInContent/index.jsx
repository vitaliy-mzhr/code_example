import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

// Components
import SignInForm from '../SignInForm';



const SignInContent = ({handleSubmit}) => (
    <Fragment>
        <div className="auth-content__google-auth">
            <h3>Sign In with social</h3>
            <div className="auth-content__social-btn-wrapper"/>
        </div>

        <div className="auth-content__divider">
            <hr className="auth-content__horizontal-line" />
            <div className="auth-content__or">or</div>
            <hr className="auth-content__horizontal-line" />
            <hr className="auth-content__vertical-line" />
        </div>

        <div className="auth-content__email-auth">
            <h3>Sign In with email</h3>
            <SignInForm onSubmit={handleSubmit} />
        </div>
    </Fragment>
);

SignInContent.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
};

export default SignInContent;
