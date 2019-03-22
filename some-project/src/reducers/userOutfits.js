import { getAllUserOutfits, getUserOutfitsSavedList, getUserOutfitsPurchasedList, getUserOutfitsViewedList } from '../actions';



const initialState = {
    isLoading: false,
    outfits: {
        saved_list: [],
        purchased_list: [],
        viewed_list: []
    },
};



export default function(state = initialState, { type, payload }) {
    switch (type) {
        case getAllUserOutfits.REQUEST:
        case getUserOutfitsSavedList.REQUEST:
        case getUserOutfitsPurchasedList.REQUEST:
        case getUserOutfitsViewedList.REQUEST:
            return {
                ...state,
                isLoading: true
            };

        case getAllUserOutfits.SUCCESS:
            return {
                ...state,
                isLoading: false,
                outfits: payload
            };

        case getUserOutfitsSavedList.SUCCESS:
        case getUserOutfitsPurchasedList.SUCCESS:
        case getUserOutfitsViewedList.SUCCESS:
            const { key, data } = payload;
            const newOutfits = {...state.outfits};
            newOutfits[key].results.push(...data.results);

            return {
                ...state,
                isLoading: false,
                outfits: newOutfits
            };

        case getAllUserOutfits.FAILURE:
        case getUserOutfitsSavedList.FAILURE:
        case getUserOutfitsPurchasedList.FAILURE:
        case getUserOutfitsViewedList.FAILURE:
            return {
                ...state,
                isLoading: false
            };

        default:
            return state;
    }
}
