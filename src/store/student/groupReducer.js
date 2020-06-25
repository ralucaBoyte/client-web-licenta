import {
    GET_GROUPS,
    GET_GROUPS_ERROR,
    SET_CURRENT_GROUP
} from "./studentActions";

const initialState = {
    currentGroup: null,
    loading: true,
    groups: [],
    error: {},
    visible: false
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_GROUPS_ERROR:
            return {
                ...state,
                error: payload
            };
        case GET_GROUPS:
            return {
                ...state,
                groups: payload,
                loading: false
            };
        case SET_CURRENT_GROUP:
            return{
                ...state,
                currentGroup: payload
            };
        default:
            return state;
    }
}