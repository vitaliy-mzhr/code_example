import api from './api';



export const getStylistsData = () => (
    api({
        method: 'GET',
        url: 'stylists'
    }).then(function (response) {
        return response.data;
    })
);



export const getStylistData = (stylists_slug) => (
    api({
        method: 'GET',
        url: `stylists/${stylists_slug}`
    }).then(function (response) {
        return response.data;
    })
);



export const userFollowStylists = (stylists_slug) => (
    api({
        method: 'POST',
        url: 'auth/user/library/my-stylists/follow',
        data: {
            stylists_slug
        }
    }).then(function (response) {
        return response.data;
    })
);



export const userUnfollowStylists = (stylists_slug) => (
    api({
        method: 'POST',
        url: 'auth/user/library/my-stylists/unfollow',
        data: {
            stylists_slug
        }
    }).then(function (response) {
        return response.data;
    })
);
