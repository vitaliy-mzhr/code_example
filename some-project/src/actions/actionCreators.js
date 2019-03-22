import * as types from './types';
import { AUTH_MODAL_TYPES } from '../config';



export const toggleCollectionMode = (payload) => ({type: types.COLLECTION_TOGGLE_MODE, payload});
export const outfitCardInteract = () => ({type: types.OUTFIT_CARD_INTERACT});

export const openAuthModal = (payload = {type: AUTH_MODAL_TYPES.SIGNUP}) => ({type: types.SHOW_AUTH_MODAL, payload});
export const closeAuthModal = () => ({type: types.HIDE_AUTH_MODAL});

export const outfitTagInteract = () => ({type: types.OUTFIT_TAG_INTERACT});

export const activateOutfitTab = (payload = {}) => ({type: types.OUTFIT_TAB_ACTIVATE, payload});

export const postOutfitComment = (payload = {}) => ({type: types.POST_OUTFIT_COMMENT, payload});

export const expandOutfit = (payload) => ({type: types.EXPAND_OUTFIT, payload});
