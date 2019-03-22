import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import cn from 'classnames';
import PropTypes from 'prop-types';

// Actions
import { mapRoutineCreators } from '../../actions/actionRoutines';
import { loopMe } from '../../actions';
// Components
import RenderInput from '../../components/renderInput';
// CONFIG
import FORMS from '../../config/forms';
// Utils
import { email } from '../../utils/validators';
import { notification } from '../../utils/notification';

const MESSAGE_TYPES = { STATIC: 'static', FLOAT: 'float' };
const NOTIFICATION_MSG = 'Thank you for signing up to the newsletter. I hope you are as pumped as we are for an efficient shopping journey!';


class LoopMeInContainer extends React.PureComponent {
    state = {
        messageVisible: false,
        messageFading: false
    };
    timeoutId = null;

    componentWillUnmount() {
        this.cancelFadeOut();
    }

    handleSubmit = values => {
        if (values.email) {
            const { email } = values;
            this.props.loopMe.trigger({ email, onSuccessFn: this.showMessage });
        }
    };

    fadeOutMessage = () => {
        this.timeoutId = setTimeout(() => {
            this._fadeOutMessage();
        }, 5000);
    };

    cancelFadeOut = () => {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
    };

    showMessage = () => {
        const { messageType } = this.props;
        if (messageType === MESSAGE_TYPES.STATIC) {
            if (this.state.messageVisible === true) {
                this.cancelFadeOut();
                this.fadeOutMessage();
                return;
            }
            this.setState({ messageVisible: true }, this.fadeOutMessage);
        } else if (messageType === MESSAGE_TYPES.FLOAT) {
            notification(NOTIFICATION_MSG);
        }
    };

    hideMessage = () => {
        this.props.reset(FORMS.LOOP_ME_IN);
        this.setState({ messageVisible: false, messageFading: false });
    };

    _fadeOutMessage = () => {
        this.setState({ messageFading: true });
    };

    render() {
        const { handleSubmit, pristine, submitting, invalid, messageType } = this.props;
        const { messageVisible, messageFading } = this.state;

        return (
            <div className="loop-me-in">
                <h3 className="loop-me-in__title">Remove the hassle from clothes shopping</h3>
                <div className="loop-me-in__description">
                    Sign up to our newsletter and get personalized styling delivered directly to your inbox.
                </div>

                <form onSubmit={handleSubmit(this.handleSubmit)} className="loop-me-in__form">
                    <Field
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        component={RenderInput}
                        validate={[email]}
                    />
                    <button
                        className="btn btn__inverted loop-me-in__btn"
                        type="submit"
                        disabled={pristine || submitting || invalid}
                    >
                        Loop me in
                    </button>
                </form>

                {messageVisible && messageType === MESSAGE_TYPES.STATIC && (
                    <div
                        className={cn('loop-me-in__message', { 'is-hidden': messageFading })}
                        onTransitionEnd={this.hideMessage}
                    >
                        { NOTIFICATION_MSG }
                    </div>
                )}
            </div>
        );
    }
}

LoopMeInContainer.propTypes = {
    messageType: PropTypes.oneOf(Object.values(MESSAGE_TYPES))
};
LoopMeInContainer.defaultProps = {
    messageType: MESSAGE_TYPES.STATIC
};

export default compose(
    connect(null, mapRoutineCreators({ loopMe })),
    reduxForm({ form: FORMS.LOOP_ME_IN })
)(LoopMeInContainer);
