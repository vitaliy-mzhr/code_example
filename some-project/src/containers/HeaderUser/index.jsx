import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import get from 'lodash/fp/get';
import {Router} from '../../../routes';
import { SimpleImg } from 'react-simple-img';

// Actions
import { mapRoutineCreators } from '../../actions/actionRoutines';
import { logout, openAuthModal } from '../../actions';
// Components
import DropdownProfile from './DropdownProfile';
import { SignUpIcon } from '../../components/SVG';
// Utils
import { isTouchSupported } from '../../utils/helpers';
import LinkTo from '../../components/LinkTo';
import AuthModal from '../Modals/AuthModal';
import { AUTH_MODAL_TYPES } from '../../config';



const dropdownRef = React.createRef();

class HeaderUser extends Component {
    state = {
        dropdownVisible: false
    };

    _toggleDropdown = (val) => (e) => {
        if (e.type === 'mouseenter' && isTouchSupported()) {
            return true;
        }

        if (e.relatedTarget && val === false) {
            if (e.relatedTarget === window ||
                !get('dropdownRef.current.contains') ||
                !dropdownRef.current.contains(e.relatedTarget)
            ) {
                this.setState({dropdownVisible: false});
            }
        } else {
            this.setState((prevState) => ({
                dropdownVisible: val !== undefined ? val : !prevState.dropdownVisible
            }));
        }
    };

    toggleDropdown = this._toggleDropdown();
    openDropdown = this._toggleDropdown(true);
    closeDropdown = this._toggleDropdown(false);

    logout = (e) => {
        this.closeDropdown(e);
        this.props.logout.trigger();
    };

    openSignUpModal = (e) => {
        e.preventDefault();
        this.props.openAuthModal({
            type: AUTH_MODAL_TYPES.SIGNUP,
            title: 'Make Shopping Effortless',
            subtitle: 'Create an account on Portefini to save collections, outfits, and clothes in just one click'
        });
    };

    render() {
        const { auth: { isAuthenticated, user: { photo, first_name, last_name} } } = this.props;
        const username = `${first_name} ${last_name}`;
        const avatar = photo || '/static/images/default_profile.jpg';

        return (
            <div className="site-header__user">
                {!isAuthenticated &&
                    <LinkTo to="/signup" className="btn btn__inverted btn__with-icon site-header__sign-up-btn" onClick={this.openSignUpModal}>
                        <SignUpIcon/> Sign Up
                    </LinkTo>
                }

                {isAuthenticated && (
                    <Fragment>
                        <div className="profile-icon" onMouseEnter={this.openDropdown} onClick={this.toggleDropdown}>
                            <SimpleImg
                                key={avatar}
                                wrapperClassName="img-holder"
                                placeholder="#ececec"
                                src={avatar}
                                animationDuration={0.3}
                            />
                        </div>
                        <DropdownProfile
                            isOn={this.state.dropdownVisible}
                            closeDropdown={this.closeDropdown}
                            logout={this.logout}
                            photo={avatar}
                            name={username}
                            ref={dropdownRef}
                        />
                    </Fragment>
                )}

                <AuthModal/>
            </div>
        );
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps, mapRoutineCreators({ logout, openAuthModal }))(HeaderUser);
