import api from './api';



export const loginUser = ({ email, password }) => (
    api({
        method: 'POST',
        url: 'auth/login',
        data: {
            email,
            password
        }
    }).then(function (response) {
        return response.data;
    })
);
