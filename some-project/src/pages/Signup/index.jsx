import React, { Component } from 'react';
import { connect } from 'react-redux';

// Actions
import { mapRoutineCreators } from '../../actions/actionRoutines';
import { signup } from '../../actions';
// Components
import LinkTo from '../../components/LinkTo';
import SignUpContent from '../../components/SignUpContent';
import { CrossIcon, ArrowIcon } from '../../components/SVG';
// Routes
import { Router } from '../../../routes';



class SignUp extends Component {
    handleSubmit = values => {
        this.props.signup.trigger({ ...values, onSuccessFn: () => { Router.pushRoute('/'); } });
    };

    render() {
        return (
            <div className="auth-page">
                <div className="auth-page__container">
                    <div className="auth-page__header">
                        <h1>Make Shopping Effortless</h1>
                        <p className="auth-page__subtitle">Create an account on Portefini to save collections, outfits, and clothes in just one click</p>
                        <LinkTo to="/" className="auth-page__close">
                            <CrossIcon/>
                            <span>close</span>
                        </LinkTo>
                    </div>

                    <div className="auth-page__content">
                        <SignUpContent handleSubmit={this.handleSubmit}/>
                    </div>

                    <div className="auth-page__footer">
                        <div>
                            Already have an account?
                            <LinkTo to="/signin" className="auth-page__footer-link">
                                Sign in
                                <ArrowIcon className="auth-page__arrow-icon"/>
                            </LinkTo>
                        </div>
                        <p>
                            By signing up or signing in, I acknowlege and agree to Portefini's Terms of Use and Privacy
                            Policy
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(null, mapRoutineCreators({ signup }))(SignUp);
