import api from './api';



export const getCategoryCollectionData = (collection_slug) => (
    api({
        method: 'GET',
        url: `collections/${collection_slug}`
    }).then(function (response) {
        return response.data;
    })
);



export const addCollectionToLibrary = (collection_slug) => (
    api({
        method: 'POST',
        url: 'auth/user/library/my-collections/add',
        data: {
            collection_slug
        }
    }).then(function (response) {
        return response.data;
    })
);



export const removeCollectionFromLibrary = (collection_slug) => (
    api({
        method: 'POST',
        url: 'auth/user/library/my-collections/remove',
        data: {
            collection_slug
        }
    }).then(function (response) {
        return response.data;
    })
);
