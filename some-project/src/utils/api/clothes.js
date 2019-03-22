import api from './api';



export const getClothesData = (category1_slug, category2_slug) => (
    api({
        method: 'GET',
        url: `clothes/${category1_slug}/${category2_slug}`
    }).then(function (response) {
        return response.data;
    })
);
