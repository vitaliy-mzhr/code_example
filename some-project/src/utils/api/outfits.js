import api from './api';



export const getOutfitData = (outfitId) => (
    api({
        method: 'GET',
        url: `outfits/${outfitId}`
    }).then(function (response) {
        return response.data;
    })
);



export const getOutfitCommentsData = (outfitId) => (
    api({
        method: 'GET',
        url: `outfits/${outfitId}/comments`
    }).then(function (response) {
        return response.data;
    })
);



export const getOutfitCollectionsData = (outfitId) => (
    api({
        method: 'GET',
        url: `outfits/${outfitId}/collections`
    }).then(function (response) {
        return response.data;
    })
);



export const getOutfitPointData = (pointId) => (
    api({
        method: 'GET',
        url: `outfits/points/${pointId}`
    }).then(function (response) {
        return response.data;
    })
);



export const saveOutfitToLibrary = (outfitId) => (
    api({
        method: 'POST',
        url: 'auth/user/library/my-outfits/save',
        data: {
            outfit_id: outfitId
        }
    }).then(function (response) {
        return response.data;
    })
);



export const removeOutfitFromLibrary = (outfitId) => (
    api({
        method: 'POST',
        url: 'auth/user/library/my-outfits/remove',
        data: {
            outfit_id: outfitId
        }
    }).then(function (response) {
        return response.data;
    })
);
