import { PRODUCT_NAME } from '../config';



const createActionType = (type) => (`${PRODUCT_NAME}/${type}`);



export const COLLECTION_TOGGLE_MODE = createActionType('COLLECTION_TOGGLE_MODE');
export const OUTFIT_CARD_INTERACT = createActionType('OUTFIT_CARD_INTERACT');

export const SHOW_AUTH_MODAL = createActionType('SHOW_AUTH_MODAL');
export const HIDE_AUTH_MODAL = createActionType('HIDE_AUTH_MODAL');

export const OUTFIT_TAG_INTERACT = createActionType('OUTFIT_TAG_INTERACT');

export const OUTFIT_TAB_ACTIVATE = createActionType('OUTFIT_TAB_ACTIVATE');

export const POST_OUTFIT_COMMENT = createActionType('POST_OUTFIT_COMMENT');

export const EXPAND_OUTFIT = createActionType('EXPAND_OUTFIT');
