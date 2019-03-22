import api from './api';



export const resetPassword = (password, password_confirmation, token) => (
    api({
        method: 'PATCH',
        url: 'reset_password',
        data: {
            password,
            password_confirmation,
            token
        }
    }).then(function (response) {
        return response.data;
    })
);
