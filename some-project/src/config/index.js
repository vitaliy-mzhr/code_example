import getConfig from 'next/config';



const {
    publicRuntimeConfig: { PORTEFINI_API_URL }
} = getConfig();


export const PRODUCT_NAME = 'Portefini';


if (!PORTEFINI_API_URL) throw new Error('You should set PORTEFINI_API_URL entry inside .env file');
export const API_BASE_URL = PORTEFINI_API_URL;


export const CLOSE_MODAL_EVENT = Symbol();


export const AUTH_MODAL_TYPES = {
    SIGNUP: 'SIGN_UP_MODAL',
    SIGNIN: 'SIGN_IN_MODAL',
    RESET_PASS: 'RESET_PASSWORD_MODAL'
};


export const SITE_CATEGORIES = {
    by_occasions: 'Occasions',
    by_styles: 'Styles',
    by_clothes: 'Clothes'
};


export const NOTY_CONFIG = {
    theme: 'metroui',
    timeout: 5000,
    progressBar: false
};


export const COLLECTION_OUTFITS_PER_PAGE = 30;

export const USER_COLLECTION_OUTFITS_PER_PAGE = 6;

// TODO: maybe would be better to make this parameter dynamic by getting scrollable area width on componentDidMount and further computation according to this value
export const USER_COLLECTION_CLOTHES_PER_PAGE = 15;


export const COLLECTION_LAYOUT = {
    WIDE: 'WIDE',
    NARROW: 'NARROW'
};


export const IMAGE_ZOOM_LEVEL = 2;


export const OUTFIT_TABS = {
    CLOTHES: 'Clothes',
    WEAR_IT: 'Wear It',
    COMMENTS: 'Comments'
};
