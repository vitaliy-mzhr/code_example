import set from 'lodash/fp/set';

import {
    getOutfit,
    getOutfitPoint,
    getOutfitCollections,
    getOutfitComments,
    saveOutfit,
    removeOutfit,
    OUTFIT_TAG_INTERACT,
    OUTFIT_TAB_ACTIVATE,
    POST_OUTFIT_COMMENT,
    EXPAND_OUTFIT
} from '../actions';
import { OUTFIT_TABS } from '../config';



const initialState = {
    isLoading: false,
    isPointsLoading: false,
    isCollectionsLoading: false,
    isCommentsLoading: false,
    data: {},
    pointsData: [],
    collections: [],
    comments: [],
    isTagInteracted: false,
    activeTab: OUTFIT_TABS.CLOTHES,
    activeSubTab: null,
    isExpanded: false
};

export default function (state = initialState, {type, payload}) {
    switch (type) {
        case saveOutfit.REQUEST:
        case removeOutfit.REQUEST:
        case getOutfit.REQUEST:
            return {
                ...state,
                isLoading: true
            };

        case getOutfitPoint.REQUEST:
            return {
                ...state,
                isPointsLoading: true
            };

        case getOutfitCollections.REQUEST:
            return {
                ...state,
                isCollectionsLoading: true
            };

        case getOutfitComments.REQUEST:
            return {
                ...state,
                isCommentsLoading: true
            };

        case getOutfit.SUCCESS:
            let newData = payload.data;
            if (payload.isUpdate) {
                const {points, ...rest} = payload.data;
                newData = {
                    ...state.data,
                    ...rest
                };
            }

            return {
                ...state,
                isLoading: false,
                data: newData,
                pointsData: payload.isUpdate ? state.pointsData : (newData.points || []),
                collections: [],
                comments: []
            };

        case getOutfitPoint.SUCCESS:
            return {
                ...state,
                isPointsLoading: false,
                pointsData: !payload.isNew
                    ? payload.data.map(({items}, index) => ({...state.pointsData[index], items}))
                    : set('[0].items', payload.data[0].items, state.pointsData)
            };

        case saveOutfit.SUCCESS:
        case removeOutfit.SUCCESS:
            return {
                ...set('data.saved', type === saveOutfit.SUCCESS, state),
                isLoading: false
            };

        case getOutfitCollections.SUCCESS:
            return {
                ...state,
                collections: payload.data,
                isCollectionsLoading: false
            };

        case getOutfitComments.SUCCESS:
            return {
                ...state,
                comments: payload.data,
                isCommentsLoading: false
            };

        case OUTFIT_TAG_INTERACT:
            return {
                ...state,
                isTagInteracted: true
            };

        case OUTFIT_TAB_ACTIVATE:
            return {
                ...state,
                ...payload
            };

        case POST_OUTFIT_COMMENT:
            return {
                ...state,
                comments: [
                    ...state.comments,
                    payload
                ]
            };

        case EXPAND_OUTFIT:
            return {
                ...state,
                isExpanded: !!payload
            };

        case saveOutfit.FAILURE:
        case removeOutfit.FAILURE:
        case getOutfit.FAILURE:
            return {
                ...state,
                isLoading: false,
            };

        case getOutfitPoint.FAILURE:
            return {
                ...state,
                isPointsLoading: false,
            };

        case getOutfitCollections.FAILURE:
            return {
                ...state,
                isCollectionsLoading: false
            };

        case getOutfitComments.FAILURE:
            return {
                ...state,
                isCommentsLoading: false
            };

        default:
            return state;
    }
}
