import api from './api';



export const registerUser = (params) => (
    api({
        method: 'POST',
        url: 'auth/register',
        data: params
    }).then(function (response) {
        return response.data;
    })
);
