import api from './api';



export const getUserCollectionsEntries = () => (
    api({
        method: 'GET',
        url: 'auth/user/library/my-collections'
    }).then(function (response) {
        return response.data;
    })
);

export const getUserCollectionsDetailsEntries = ({ category_type, category_slug }) => (
    api({
        method: 'GET',
        url: `auth/user/library/my-collections/${category_type}/${category_slug}`
    }).then(function (response) {
        return response.data;
    })
);

export const getUserStylistsEntries = () => (
    api({
        method: 'GET',
        url: 'auth/user/library/my-stylists'
    }).then(function (response) {
        return response.data;
    })
);

export const getUserOutfitsSavedListEntries = (offset, limit) => (
    api({
        method: 'GET',
        url: 'auth/user/library/my-outfits/saved-list',
        params: { offset, limit }
    }).then(function (response) {
        return response.data;
    })
);

export const getUserOutfitsPurchasedListEntries = (offset, limit) => (
    api({
        method: 'GET',
        url: 'auth/user/library/my-outfits/purchased-list',
        params: { offset, limit }
    }).then(function (response) {
        return response.data;
    })
);

export const getUserOutfitsViewedListEntries = (offset, limit) => (
    api({
        method: 'GET',
        url: 'auth/user/library/my-outfits/viewed-list',
        params: { offset, limit }
    }).then(function (response) {
        return response.data;
    })
);

export const getUserClothesInCartListEntries = (offset, limit) => (
    api({
        method: 'GET',
        url: 'auth/user/library/my-clothes/in-cart-list',
        params: { offset, limit }
    }).then(function (response) {
        return response.data;
    })
);

export const getUserClothesSavedListEntries = (offset, limit) => (
    api({
        method: 'GET',
        url: 'auth/user/library/my-clothes/saved-list',
        params: { offset, limit }
    }).then(function (response) {
        return response.data;
    })
);

export const getUserClothesViewedListEntries = (offset, limit) => (
    api({
        method: 'GET',
        url: 'auth/user/library/my-clothes/viewed-list',
        params: { offset, limit }
    }).then(function (response) {
        return response.data;
    })
);

export const getUserClothesOwnedListEntries = (offset, limit) => (
    api({
        method: 'GET',
        url: 'auth/user/library/my-clothes/owned-list',
        params: { offset, limit }
    }).then(function (response) {
        return response.data;
    })
);
