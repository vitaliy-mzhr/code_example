import api from './api';



export const getUserEntries = () => (
    api({
        method: 'GET',
        url: 'auth/user/info'
    }).then(function (response) {
        return response.data;
    })
);

export const updateUserEntries = (params) => (
    api({
        method: 'PATCH',
        url: 'auth/user/info',
        data: params
    }).then(function (response) {
        return response.data;
    })
);

export const updateUserPasswordEntries = (data) => (
    api({
        method: 'POST',
        url: 'auth/user/change_password',
        data
    }).then(function (response) {
        return response.data;
    })
);

export const updateUserAvatarEntries = (data) => (
    api({
        method: 'PATCH',
        url: 'auth/user/photo',
        data
    }).then(function (response) {
        return response.data;
    })
);
