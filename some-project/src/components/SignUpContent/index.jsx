import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

// Components
import SignUpForm from '../SignUpForm';



const SignUpContent = ({handleSubmit}) => (
    <Fragment>
        <div className="auth-content__google-auth">
            <h3>Sign Up with social</h3>
            <div className="auth-content__social-btn-wrapper"/>
        </div>

        <div className="auth-content__divider">
            <hr className="auth-content__horizontal-line" />
            <div className="auth-content__or">or</div>
            <hr className="auth-content__horizontal-line" />
            <hr className="auth-content__vertical-line" />
        </div>

        <div className="auth-content__email-auth">
            <h3>Sign Up with email</h3>
            <SignUpForm onSubmit={handleSubmit} />
        </div>
    </Fragment>
);

SignUpContent.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
};

export default SignUpContent;
