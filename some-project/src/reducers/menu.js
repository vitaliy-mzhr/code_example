import { getMenu } from '../actions';



const initialState = {
    isLoading: false,
    items: {}
};

export default function (state = initialState, {type, payload}) {
    switch (type) {
        case getMenu.REQUEST:
            return {
                ...state,
                isLoading: true
            };

        case getMenu.SUCCESS:
            return {
                ...state,
                isLoading: false,
                items: payload
            };

        case getMenu.FAILURE:
            return {
                ...state,
                isLoading: false,
            };

        default:
            return state;
    }
}
