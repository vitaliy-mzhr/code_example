import api from './api';



export const getCategoryCollectionOutfitsData = (collection_slug, offset, limit, filtersQuery='') => (
    api({
        method: 'GET',
        url: `collections/${collection_slug}/outfits${filtersQuery}`,
        params: {
            offset,
            limit
        }
    }).then(function (response) {
        return response.data;
    })
);



export const getStylistOutfitsData = (stylist_slug, offset, limit, filtersQuery='') => (
    api({
        method: 'GET',
        url: `stylists/${stylist_slug}/outfits${filtersQuery}`,
        params: {
            offset,
            limit
        }
    }).then(function (response) {
        return response.data;
    })
);



export const getClothesOutfitsData = (category1_slug, category2_slug, offset, limit, filtersQuery='') => (
    api({
        method: 'GET',
        url: `clothes/${category1_slug}/${category2_slug}/outfits${filtersQuery}`,
        params: {
            offset,
            limit
        }
    }).then(function (response) {
        return response.data;
    })
);
