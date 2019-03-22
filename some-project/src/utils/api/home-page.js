import api from './api';



export const getHomeData = () => (
    api({
        method: 'GET',
        url: 'home_page'
    }).then(function (response) {
        return response.data;
    })
);
