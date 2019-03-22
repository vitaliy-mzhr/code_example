import remove from 'lodash/fp/remove';
import get from 'lodash/fp/get';

import { getUserStylists, followStylist, unfollowStylist } from '../actions';



const initialState = {
    isLoading: false,
    data: {},
};



export default function(state = initialState, { type, payload }) {
    switch (type) {
        case getUserStylists.REQUEST:
        case followStylist.REQUEST:
        case unfollowStylist.REQUEST:
            return {
                ...state,
                isLoading: true
            };

        case getUserStylists.SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: payload || {}
            };

        case followStylist.SUCCESS:
            if (Object.keys(state.data).length <= 0) return { ...state, isLoading: false };

            const stylistsArray = [
                ...get('viewed', state.data) || [],
                ...get('my_saved_outfits', state.data) || [],
            ];

            const newFollowedStylists = [...state.data.followed];
            const foundFollowedStylist = stylistsArray.find((element) => element.slug === payload.slug);
            if (foundFollowedStylist) {
                newFollowedStylists.push({...foundFollowedStylist, followed: true});
            }

            return {
                ...state,
                data: {
                    followed: newFollowedStylists,
                    viewed: remove(['slug', payload.slug], state.data.viewed),
                    my_saved_outfits: state.data.my_saved_outfits.map((element) => ({
                        ...element,
                        followed: element.slug === payload.slug ? true : element.followed
                    }))
                },
                isLoading: false,
            };

        case unfollowStylist.SUCCESS:
            if (Object.keys(state.data).length <= 0) return { ...state, isLoading: false };

            const newViewedStylists = [...state.data.viewed];
            const foundUnfollowedStylist = state.data.followed.find((element) => element.slug === payload.slug);
            if (foundUnfollowedStylist) {
                newViewedStylists.push({...foundUnfollowedStylist, followed: false});
            }

            return {
                ...state,
                data: {
                    followed: remove(['slug', payload.slug], state.data.followed),
                    viewed: newViewedStylists,
                    my_saved_outfits: state.data.my_saved_outfits.map((element) => ({
                        ...element,
                        followed: element.slug === payload.slug ? false : element.followed
                    }))
                },
                isLoading: false,
            };

        case getUserStylists.FAILURE:
        case followStylist.FAILURE:
        case unfollowStylist.FAILURE:
            return {
                ...state,
                isLoading: false
            };

        default:
            return state;
    }
}
