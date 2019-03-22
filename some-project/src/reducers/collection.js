import set from 'lodash/fp/set';

import {
    getCategoryCollection,
    getCategoryCollectionOutfits,
    getStylist,
    getStylistOutfits,
    userAddCollection,
    userRemoveCollection,
    followStylist,
    unfollowStylist,
    COLLECTION_TOGGLE_MODE
} from '../actions';
import { COLLECTION_LAYOUT } from '../config';



const initialState = {
    isLoadingData: false,
    isLoadingOutfits: false,
    data: {},
    outfits: {},
    wideMode: COLLECTION_LAYOUT.NARROW,
    isVisitedOutfit: false
};

export default function (state = initialState, {type, payload}) {
    switch (type) {
        case userAddCollection.REQUEST:
        case userRemoveCollection.REQUEST:
        case followStylist.REQUEST:
        case unfollowStylist.REQUEST:
        case getCategoryCollection.REQUEST:
        case getStylist.REQUEST:
            return {
                ...state,
                isLoadingData: true,
                isLoadingOutfits: payload ? !!payload.withOutfits || state.isLoadingOutfits : state.isLoadingOutfits
            };

        case getCategoryCollectionOutfits.REQUEST:
        case getStylistOutfits.REQUEST:
            return {
                ...state,
                isLoadingOutfits: true
            };

        case getCategoryCollection.SUCCESS:
        case getStylist.SUCCESS:
            return {
                ...state,
                isLoadingData: false,
                isLoadingOutfits: payload.outfits ? false : state.isLoadingOutfits,
                data: payload.data,
                outfits: payload.outfits
                    ? {
                        ...state.outfits,
                        offset: payload.offset,
                        limit: payload.limit,
                        count: payload.outfits.count,
                        filtersQuery: payload.filtersQuery,
                        chosenFilters: payload.chosenFilters,
                        results: payload.outfits.results
                    }
                    : {...state.outfits}
            };

        case getCategoryCollectionOutfits.SUCCESS:
        case getStylistOutfits.SUCCESS:
            let newResults = [];

            if (payload.loadMore && Array.isArray(state.outfits.results)) {
                newResults = [
                    ...state.outfits.results,
                    ...payload.outfits.results
                ];
            } else {
                newResults = payload.outfits.results;
            }

            return {
                ...state,
                isLoadingOutfits: false,
                outfits: {
                    ...state.outfits,
                    offset: payload.offset,
                    limit: payload.limit,
                    count: payload.outfits.count,
                    filtersQuery: payload.filtersQuery,
                    chosenFilters: payload.chosenFilters,
                    results: newResults
                }
            };

        case userAddCollection.SUCCESS:
        case userRemoveCollection.SUCCESS:
        case followStylist.SUCCESS:
        case unfollowStylist.SUCCESS:
            const {slug} = payload;

            if (!slug || !state.data.slug || slug !== state.data.slug) {
                return state;
            }

            const flag = type === userAddCollection.SUCCESS || type === followStylist.SUCCESS;
            let path = 'data.added';
            if (type === followStylist.SUCCESS || type === unfollowStylist.SUCCESS) {
                path = 'data.followed';
            }

            return {
                ...set(path, flag, state),
                isLoadingData: false
            };

        case COLLECTION_TOGGLE_MODE:
            return {
                ...state,
                wideMode: payload
            };

        case userAddCollection.FAILURE:
        case userRemoveCollection.FAILURE:
        case getStylistOutfits.FAILURE:
        case getStylist.FAILURE:
        case followStylist.FAILURE:
        case unfollowStylist.FAILURE:
        case getCategoryCollection.FAILURE:
        case getCategoryCollectionOutfits.FAILURE:
            return {
                ...state,
                isLoadingData: false,
                isLoadingOutfits: false,
            };

        default:
            return state;
    }
}
