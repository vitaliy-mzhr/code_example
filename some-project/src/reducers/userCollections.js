import { getUserCollections, getUserCollectionsDetails, userAddCollection, userRemoveCollection } from '../actions';



const initialState = {
    isLoading: false,
    data: [],
};



export default function(state = initialState, { type, payload }) {
    switch (type) {
        case getUserCollections.REQUEST:
        case getUserCollectionsDetails.REQUEST:
        case userAddCollection.REQUEST:
        case userRemoveCollection.REQUEST:
            return {
                ...state,
                isLoading: true
            };

        case getUserCollections.SUCCESS:
        case getUserCollectionsDetails.SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: payload || []
            };

        case userAddCollection.SUCCESS:
            return {
                ...state,
                data: state.data.map((element) => ({
                    ...element,
                    collections: element.collections.map((value) => ({
                        ...value,
                        added: value.slug === payload.slug ? true : value.added
                    })),
                })),
                isLoading: false,
            };

        case userRemoveCollection.SUCCESS:
            return {
                ...state,
                data: state.data.map((element) => ({
                    ...element,
                    collections: element.collections.map((value) => {
                        if (value.slug === payload.slug) {
                            if (value.added && value.viewed) {
                                return {...value, added: false};
                            } else {
                                return undefined;
                            }
                        }
                        return value;
                    }).filter(Boolean)
                })),
                isLoading: false,
            };

        case getUserCollections.FAILURE:
        case getUserCollectionsDetails.FAILURE:
        case userAddCollection.FAILURE:
        case userRemoveCollection.FAILURE:
            return {
                ...state,
                isLoading: false
            };

        default:
            return state;
    }
}
