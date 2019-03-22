import get from 'lodash/fp/get';

import {
    getAllUserClothes, getUserClothesInCartList, getUserClothesSavedList, getUserClothesViewedList,
    getUserClothesOwnedList, saveItem, removeItem, ownItem, inCartItem, boughtItem
} from '../actions';



const initialState = {
    isLoading: false,
    clothes: {
        in_cart_list: {},
        saved_list: {},
        viewed_list: {},
        owned_list: {}
    },
};



export default function(state = initialState, { type, payload }) {
    switch (type) {
        case getAllUserClothes.REQUEST:
        case getUserClothesInCartList.REQUEST:
        case getUserClothesSavedList.REQUEST:
        case getUserClothesViewedList.REQUEST:
        case getUserClothesOwnedList.REQUEST:
        case boughtItem.REQUEST:
        case inCartItem.REQUEST:
        case ownItem.REQUEST:
        case saveItem.REQUEST:
        case removeItem.REQUEST:
            return {
                ...state,
                isLoading: true
            };

        case getAllUserClothes.SUCCESS:
            return {
                ...state,
                isLoading: false,
                clothes: payload
            };

        case getUserClothesInCartList.SUCCESS:
        case getUserClothesSavedList.SUCCESS:
        case getUserClothesViewedList.SUCCESS:
        case getUserClothesOwnedList.SUCCESS:
            const { key, data } = payload;
            const newClothes = {...state.clothes};
            newClothes[key].results.push(...data.results);

            return {
                ...state,
                isLoading: false,
                clothes: newClothes
            };

        case boughtItem.SUCCESS:
            return {
                ...state,
                clothes: {
                    ...state.clothes,
                    owned_list: {
                        ...state.clothes.owned_list,
                        results: state.clothes.owned_list.results.map((value) => ({
                            ...value,
                            finally_bought: value.pid === payload.id ? true : value.finally_bought
                        })),
                    }
                },
                isLoading: false
            };

        case inCartItem.SUCCESS:
            const newInCartList = {...state.clothes.in_cart_list};
            const removedItem = state.clothes.owned_list.results.find(({ pid }) => pid === payload.id);
            newInCartList.results.unshift({
                ...removedItem,
                finally_bought: false,
                owned: false,
                in_cart: true
            });
            const newOwnedList = {
                ...state.clothes.owned_list,
                results: state.clothes.owned_list.results.filter((val) => val.pid !== payload.id)
            };

            return {
                ...state,
                clothes: {
                    ...state.clothes,
                    in_cart_list: newInCartList,
                    owned_list: newOwnedList
                },
                isLoading: false
            };

        case ownItem.SUCCESS:
            const inCartListResults = get('in_cart_list.results', state.clothes);
            let removedInCartItem = null;
            if (Array.isArray(inCartListResults)) {
                removedInCartItem = inCartListResults.find(({ pid }) => pid === payload.id);
            }

            if (!removedInCartItem) {
                return {
                    ...state,
                    isLoading: false
                };
            }

            removedInCartItem.finally_bought = false;
            removedInCartItem.owned = true;
            removedInCartItem.in_cart = false;

            return {
                ...state,
                clothes: {
                    ...state.clothes,
                    owned_list: {
                        ...state.clothes.owned_list,
                        results: [
                            removedInCartItem,
                            ...state.clothes.owned_list.results
                        ]
                    },
                    in_cart_list: {
                        ...state.clothes.in_cart_list,
                        results: state.clothes.in_cart_list.results.filter((val) => val.pid !== payload.id)
                    }
                },
                isLoading: false
            };

        case saveItem.SUCCESS:
        case removeItem.SUCCESS:
            const {id, clothesType} = payload;
            const clothesList = get(`${clothesType}.results`, state.clothes);
            let foundItem = null;
            if (clothesList) {
                foundItem = clothesList.find(({ pid }) => pid === id);
            }

            if (!foundItem) {
                return {
                    ...state,
                    isLoading: false
                };
            }

            const isSaveItemAction = type === saveItem.SUCCESS;
            foundItem.saved = isSaveItemAction;

            const newSavedListWithSaveItem = {...state.clothes.saved_list};
            const newViewedListWithSaveItem = {...state.clothes.viewed_list};
            if (isSaveItemAction) {
                newSavedListWithSaveItem.results = [foundItem, ...state.clothes.saved_list.results];
                newViewedListWithSaveItem.results = newViewedListWithSaveItem.results.filter((val) => val.pid !== id);
            } else {
                if (foundItem.viewed) {
                    newViewedListWithSaveItem.results = [foundItem, ...state.clothes.viewed_list.results];
                }
                newSavedListWithSaveItem.results = newSavedListWithSaveItem.results.filter((val) => val.pid !== id);
            }

            return {
                ...state,
                clothes: {
                    ...state.clothes,
                    in_cart_list: {
                        ...state.clothes.in_cart_list,
                        results: state.clothes.in_cart_list.results && state.clothes.in_cart_list.results.map((value) => ({
                            ...value,
                            saved: value.pid === id ? isSaveItemAction : value.saved
                        }))
                    },
                    owned_list: {
                        ...state.clothes.owned_list,
                        results: state.clothes.owned_list.results && state.clothes.owned_list.results.map((value) => ({
                            ...value,
                            saved: value.pid === id ? isSaveItemAction : value.saved
                        }))
                    },
                    saved_list: newSavedListWithSaveItem,
                    viewed_list: newViewedListWithSaveItem
                },
                isLoading: false
            };

        case getAllUserClothes.FAILURE:
        case getUserClothesInCartList.FAILURE:
        case getUserClothesSavedList.FAILURE:
        case getUserClothesViewedList.FAILURE:
        case getUserClothesOwnedList.FAILURE:
        case boughtItem.FAILURE:
        case inCartItem.FAILURE:
        case ownItem.FAILURE:
        case saveItem.FAILURE:
        case removeItem.FAILURE:
            return {
                ...state,
                isLoading: false
            };

        default:
            return state;
    }
}
