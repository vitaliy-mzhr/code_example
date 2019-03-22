import set from 'lodash/fp/set';

import { getStylists, followStylist, unfollowStylist } from '../actions';



const initialState = {
    isLoading: false,
    data: {}
};

export default function (state = initialState, {type, payload}) {
    switch (type) {
        case getStylists.REQUEST:
            return {
                ...state,
                isLoading: true
            };

        case getStylists.SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: payload
            };

        case followStylist.SUCCESS:
        case unfollowStylist.SUCCESS:
            const {slug} = payload;

            if (!slug || !Object.keys(state.data).length) {
                return state;
            }

            const collectionIndex = state.data.collections.findIndex((val) => val.slug === slug);
            if (collectionIndex === -1) {
                return state;
            }

            const flag = type === followStylist.SUCCESS;
            return set(`data.collections[${collectionIndex}].followed`, flag, state);

        case getStylists.FAILURE:
            return {
                ...state,
                isLoading: false,
            };

        default:
            return state;
    }
}
