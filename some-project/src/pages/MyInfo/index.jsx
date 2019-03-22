import React, { Component } from 'react';
import { connect } from 'react-redux';

// Actions
import { mapRoutineCreators } from '../../actions/actionRoutines';
import { updateUser } from '../../actions';
// Components
import SectionPersonalInfo from './SectionPersonalInfo';
import SectionAddressInfo from './SectionAddressInfo';
import UserProfileModal from '../../containers/Modals/UserProfileModal';



class MyInfo extends Component {
    state = {
        isModalOpen: false,
        modalType: 'email'
    };

    openUserProfileModal = (e) => {
        e.preventDefault();
        this.setState({isModalOpen: true, modalType: e.target.name});
    };

    closeUserProfileModal = () => {
        this.setState({isModalOpen: false});
    };

    // TODO: change logic from document to react state or another
    addStyle = (propName, style = 'is-visible') => {
        const validPropName = propName.match(/birth_date/) ? 'birth_date' : propName;
        const element = document.getElementById(validPropName);
        element.classList.add(style);
    };

    // TODO: change logic from document to react state or another
    removeStyle = (propName, style = 'is-visible') => {
        const validPropName = propName.match(/birth_date/) ? 'birth_date' : propName;
        const element = document.getElementById(validPropName);
        element.classList.remove(style);
    };

    updateUser = ({ propName, values }) => {
        this.removeStyle(propName, 'is-visible');
        this.props.updateUser.trigger({ propName, values, fn: this.addStyle });
    };

    render() {
        const { auth: { user } } = this.props;
        const { modalType, isModalOpen } = this.state;

        return (
            <div className="my-info-page">
                <div className="my-info-page__content">
                    <h1>My Info</h1>

                    <div className="my-info-page__input-group-change">
                        <label htmlFor="emailMyInfo">Email:</label>

                        <input
                            id="emailMyInfo"
                            type="text"
                            placeholder="Email"
                            value={user.email || ''}
                            className="my-info-page__input"
                            disabled
                        />

                        <button
                            name="email"
                            className="btn my-info-page__change-btn"
                            onClick={this.openUserProfileModal}
                            type="button"
                        >
                            Change
                        </button>
                    </div>

                    <div className="my-info-page__input-group-change">
                        <label htmlFor="passwordMyInfo">Password:</label>

                        <input
                            id="passwordMyInfo"
                            type="password"
                            value="0123456789"
                            className="my-info-page__input"
                            disabled
                        />

                        <button
                            name="password"
                            className="btn my-info-page__change-btn"
                            onClick={this.openUserProfileModal}
                            type="button"
                        >
                            Change
                        </button>
                    </div>

                    <hr className="my-info-page__divider" />

                    <SectionPersonalInfo user={user} updateUser={this.updateUser}/>

                    <hr className="my-info-page__divider" />

                    <SectionAddressInfo userAddress={user.address} updateUser={this.updateUser}/>

                    <hr className="my-info-page__divider" />

                    <div className="my-info-page__input-group">
                        <label>Linked Accounts:</label>
                        <div className="linl-to-google-account">Link to Google</div>
                    </div>
                </div>

                {isModalOpen && <UserProfileModal onClose={this.closeUserProfileModal} type={modalType}/>}
            </div>
        );
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(
    mapStateToProps,
    mapRoutineCreators({ updateUser })
)(MyInfo);
