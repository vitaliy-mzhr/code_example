import api from './api';



export const forgotPassword = (email) => (
    api({
        method: 'POST',
        url: 'reset_password',
        data: {
            email
        }
    }).then(function (response) {
        return response.data;
    })
);
