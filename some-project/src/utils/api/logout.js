import api from './api';



export const logoutUser = () => (
    api({
        method: 'POST',
        url: 'auth/logout'
    }).then(function (response) {
        return response.data;
    })
);
