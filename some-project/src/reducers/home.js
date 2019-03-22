import { getHomePage } from '../actions';



const initialState = {
    isLoading: false,
    sections: {}
};

export default function (state = initialState, {type, payload}) {
    switch (type) {
        case getHomePage.REQUEST:
            return {
                ...state,
                isLoading: true
            };

        case getHomePage.SUCCESS:
            return {
                ...state,
                isLoading: false,
                sections: payload
            };

        case getHomePage.FAILURE:
            return {
                ...state,
                isLoading: false,
            };

        default:
            return state;
    }
}

