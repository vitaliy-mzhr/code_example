import { createRoutine } from './actionRoutines';
import { PRODUCT_NAME } from '../config';



const addRoutine = (action) => createRoutine(`${PRODUCT_NAME}/${action}`);

const login = addRoutine('LOGIN');
const signup = addRoutine('SIGNUP');
const logout = addRoutine('LOGOUT');

const getUser = addRoutine('GET_USER');
const updateUser = addRoutine('UPDATE_USER');
const updateUserEmail = addRoutine('UPDATE_USER_EMAIL');
const updateUserPassword = addRoutine('UPDATE_USER_PASSWORD');
const updateUserAvatar = addRoutine('UPDATE_USER_AVATAR');

const getMenu = addRoutine('GET_MENU');

const loopMe = addRoutine('LOOP_ME');

const getHomePage = addRoutine('GET_HOME_PAGE');

const setAuth = addRoutine('SET_AUTH');
const resetAuth = addRoutine('RESET_AUTH');

const getCategory = addRoutine('GET_CATEGORY');
const getCategoryCollection = addRoutine('GET_CATEGORY_COLLECTION');
const getCategoryCollectionOutfits = addRoutine('GET_CATEGORY_COLLECTION_OUTFITS');
const userAddCollection = addRoutine('USER_ADD_COLLECTION');
const userRemoveCollection = addRoutine('USER_REMOVE_COLLECTION');

const getStylists = addRoutine('GET_STYLISTS');
const getStylist = addRoutine('GET_STYLIST');
const getStylistOutfits = addRoutine('GET_STYLIST_OUTFITS');
const followStylist = addRoutine('FOLLOW_STYLIST');
const unfollowStylist = addRoutine('UNFOLLOW_STYLIST');

const getClothes = addRoutine('GET_CLOTHES');
const getClothesOutfits = addRoutine('GET_CLOTHES_OUTFITS');

const getOutfit = addRoutine('GET_OUTFIT');
const getOutfitPoint = addRoutine('GET_OUTFIT_POINT');
const getOutfitCollections = addRoutine('GET_OUTFIT_COLLECTIONS');
const getOutfitComments = addRoutine('GET_OUTFIT_COMMENTS');
const saveOutfit = addRoutine('SAVE_OUTFIT');
const removeOutfit = addRoutine('REMOVE_OUTFIT');

const saveItem = addRoutine('SAVE_ITEM');
const removeItem = addRoutine('REMOVE_ITEM');
const ownItem = addRoutine('OWN_ITEM');
const inCartItem = addRoutine('IN_CART_ITEM');
const boughtItem = addRoutine('BOUGHT_ITEM');

const getUserCollections = addRoutine('GET_USER_COLLECTIONS');
const getUserCollectionsDetails = addRoutine('GET_USER_COLLECTIONS_DETAILS');

const getUserStylists = addRoutine('GET_USER_STYLISTS');

const getAllUserOutfits = addRoutine('GET_ALL_USER_OUTFITS');
const getUserOutfitsSavedList = addRoutine('GET_USER_OUTFITS_SAVED_LIST');
const getUserOutfitsPurchasedList = addRoutine('GET_USER_OUTFITS_PURCHASED_LIST');
const getUserOutfitsViewedList = addRoutine('GET_USER_OUTFITS_VIEWED_LIST');

export const getAllUserClothes = addRoutine('GET_ALL_USER_CLOTHES');
export const getUserClothesInCartList = addRoutine('GET_USER_CLOTHES_IN_CART_LIST');
export const getUserClothesSavedList = addRoutine('GET_USER_CLOTHES_SAVED_LIST');
export const getUserClothesViewedList = addRoutine('GET_USER_CLOTHES_VIEWED_LIST');
export const getUserClothesOwnedList = addRoutine('GET_USER_CLOTHES_OWNED_LIST');

export {
    login,
    signup,
    logout,
    getUser,
    updateUser,
    updateUserEmail,
    updateUserPassword,
    updateUserAvatar,
    getMenu,
    loopMe,
    getHomePage,
    setAuth,
    resetAuth,
    getCategory,
    getCategoryCollection,
    getCategoryCollectionOutfits,
    userAddCollection,
    userRemoveCollection,
    getStylists,
    getStylist,
    getStylistOutfits,
    followStylist,
    unfollowStylist,
    getClothes,
    getClothesOutfits,
    getOutfit,
    getOutfitPoint,
    getOutfitCollections,
    getOutfitComments,
    saveOutfit,
    removeOutfit,
    saveItem,
    removeItem,
    ownItem,
    inCartItem,
    boughtItem,
    getUserCollections,
    getUserCollectionsDetails,
    getUserStylists,
    getAllUserOutfits,
    getUserOutfitsSavedList,
    getUserOutfitsPurchasedList,
    getUserOutfitsViewedList
};
