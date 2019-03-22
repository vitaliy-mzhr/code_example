import api from './api';



export const saveItemToLibrary = (pid) => (
    api({
        method: 'POST',
        url: 'auth/user/library/my-clothes/save',
        data: {pid}
    }).then(function (response) {
        return response.data;
    })
);



export const removeItemFromLibrary = (pid) => (
    api({
        method: 'POST',
        url: 'auth/user/library/my-clothes/remove',
        data: {pid}
    }).then(function (response) {
        return response.data;
    })
);



export const ownItemToLibrary = (pid) => (
    api({
        method: 'POST',
        url: 'auth/user/library/my-clothes/own',
        data: {pid}
    }).then(function (response) {
        return response.data;
    })
);



export const putItemToCart = (pid) => (
    api({
        method: 'POST',
        url: 'auth/user/library/my-clothes/in-cart',
        data: {pid}
    }).then(function (response) {
        return response.data;
    })
);



export const finallyBoughtItem = (pid) => (
    api({
        method: 'POST',
        url: 'auth/user/library/my-clothes/finally-bought',
        data: {pid}
    }).then(function (response) {
        return response.data;
    })
);
