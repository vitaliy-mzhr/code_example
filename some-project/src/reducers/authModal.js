import { SHOW_AUTH_MODAL, HIDE_AUTH_MODAL} from '../actions';
import { AUTH_MODAL_TYPES } from '../config';



const initialState = {
    isOpen: false,
    type: AUTH_MODAL_TYPES.SIGNUP,
    title: 'Make Shopping Effortless',
    subtitle: 'Create an account on Portefini to save collections, outfits, and clothes in just one click'
};



export default function(state = initialState, { type, payload }) {
    switch (type) {
        case SHOW_AUTH_MODAL:
            let newState = {};

            if (payload.type === AUTH_MODAL_TYPES.SIGNUP) {
                newState = {
                    title: initialState.title,
                    subtitle: initialState.subtitle,
                };
            }
            newState = {...newState, ...payload};

            return {
                ...state,
                isOpen: true,
                ...newState
            };

        case HIDE_AUTH_MODAL:
            return {
                ...state,
                isOpen: false
            };

        default:
            return state;
    }
}
