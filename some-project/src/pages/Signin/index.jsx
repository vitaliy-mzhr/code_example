import React, { Component } from 'react';
import { connect } from 'react-redux';

// Actions
import { mapRoutineCreators } from '../../actions/actionRoutines';
import { login } from '../../actions';
// Components
import LinkTo from '../../components/LinkTo/index';
import SignInContent from '../../components/SignInContent';
import { CrossIcon, ArrowIcon } from '../../components/SVG';
// Routes
import { Router } from '../../../routes';



class SignIn extends Component {
    handleSubmit = values => {
        this.props.login.trigger({ ...values, onSuccessFn: () => { Router.pushRoute('/'); } });
    };

    render() {
        return (
            <div className="auth-page">
                <div className="auth-page__container">
                    <div className="auth-page__header">
                        <h1>Welcome back to Portefini</h1>
                        <LinkTo to="/" className="auth-page__close">
                            <CrossIcon />
                            <span>close</span>
                        </LinkTo>
                    </div>

                    <div className="auth-page__content">
                        <SignInContent handleSubmit={this.handleSubmit}/>
                    </div>

                    <div className="auth-page__footer">
                        <div>
                            Don't have an account yet?
                            <LinkTo to="/signup" className="auth-page__footer-link">
                                Join now
                                <ArrowIcon className="auth-page__arrow-icon"/>
                            </LinkTo>
                        </div>
                        <p>
                            By signing up or signing in, I acknowlege and agree to Portefini's Terms of Use and Privacy Policy
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(null, mapRoutineCreators({ login }))(SignIn);
