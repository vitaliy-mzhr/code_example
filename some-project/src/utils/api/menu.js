import api from './api';



export const getMenuEntries = () => (
    api({
        method: 'GET',
        url: 'other/menu_points'
    }).then(function (response) {
        return response.data;
    })
);

