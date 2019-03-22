import set from 'lodash/fp/set';

import {
    signup,
    login,
    logout,
    getUser,
    updateUser,
    updateUserEmail,
    updateUserPassword,
    setAuth,
    resetAuth,
    updateUserAvatar,
    OUTFIT_CARD_INTERACT
} from '../actions';



const initialState = {
    isLoading: false,
    isAuthenticated: false,
    user: {},
    showOutfitCardText: true
};



export default function(state = initialState, { type, payload }) {
    switch (type) {
        case updateUser.REQUEST:
        case updateUserEmail.REQUEST:
        case updateUserPassword.REQUEST:
        case updateUserAvatar.REQUEST:
        case getUser.REQUEST:
        case signup.REQUEST:
        case login.REQUEST:
            return {
                ...state,
                isLoading: true
            };

        case signup.SUCCESS:
        case login.SUCCESS:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: true,
                user: payload
            };

        case updateUser.SUCCESS:
        case updateUserEmail.SUCCESS:
        case getUser.SUCCESS:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: true,
                user: payload
            };

        case updateUserPassword.SUCCESS:
            return {
                ...state,
                isLoading: false
            };

        case updateUserAvatar.SUCCESS:
            return {
                ...set('user.photo', payload.photo, state),
                isLoading: false
            };

        case updateUser.FAILURE:
        case updateUserEmail.FAILURE:
        case updateUserPassword.FAILURE:
        case updateUserAvatar.FAILURE:
        case getUser.FAILURE:
        case signup.FAILURE:
        case login.FAILURE:
            return {
                ...state,
                isLoading: false
            };

        case setAuth.SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
            };

        case logout.SUCCESS:
        case resetAuth.SUCCESS:
            return {
                ...state,
                isAuthenticated: false,
                user: {},
            };

        case OUTFIT_CARD_INTERACT:
            return {
                ...state,
                showOutfitCardText: false
            };

        default:
            return state;
    }
}
