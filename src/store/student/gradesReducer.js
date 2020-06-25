import {
    GET_GRADES_ERROR,
    GET_GRADES
} from "./studentActions";

const initialState = {
    loading: true,
    grades: [],
    error: {},
    visible: false
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_GRADES_ERROR:
            return {
                ...state,
                error: payload
            };
        case GET_GRADES:
            return {
                ...state,
                grades: payload,
                loading: false,
                visible: true
            };
        default:
            return state;
    }
}