import set from 'lodash/fp/set';

import { getCategory, userAddCollection, userRemoveCollection } from '../actions';



const initialState = {
    isLoading: false,
    data: {}
};

export default function (state = initialState, {type, payload}) {
    switch (type) {
        case getCategory.REQUEST:
            return {
                ...state,
                isLoading: true
            };

        case getCategory.SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: payload
            };

        case userAddCollection.SUCCESS:
        case userRemoveCollection.SUCCESS:
            const {slug, categoryId} = payload;

            if (!slug || !categoryId || !state.data.id || categoryId !== state.data.id) {
                return state;
            }

            const collectionIndex = state.data.collections.findIndex((val) => val.slug === slug);
            if (collectionIndex === -1) {
                return state;
            }

            const flag = type === userAddCollection.SUCCESS;
            return set(`data.collections[${collectionIndex}].added`, flag, state);

        case getCategory.FAILURE:
            return {
                ...state,
                isLoading: false,
            };

        default:
            return state;
    }
}
