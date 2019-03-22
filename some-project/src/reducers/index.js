import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import menu from './menu';
import home from './home';
import auth from './auth';
import category from './category';
import stylists from './stylists';
import collection from './collection';
import outfit from './outfit';
import authModal from './authModal';
import userCollections from './userCollections';
import userStylists from './userStylists';
import userOutfits from './userOutfits';
import userClothes from './userClothes';



const rootReducer = combineReducers({
    menu,
    home,
    auth,
    category,
    stylists,
    collection,
    outfit,
    authModal,
    userCollections,
    userStylists,
    userOutfits,
    userClothes,
    form: formReducer
});

export default rootReducer;
