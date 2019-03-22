import api from './api';



export const getCategoryData = (type, name) => (
    api({
        method: 'GET',
        url: `${type}/${name}`
    }).then(function (response) {
        return response.data;
    })
);
