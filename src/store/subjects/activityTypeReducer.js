import {
    AUTH_ERROR,
    GET_ACTIVITIES_OF_TEACHER,
    GET_ACTIVITIES_OF_TEACHER_ERROR,
    GET_REQUEST_FAIL
} from "./subjectActions";

const initialState = {
    currentActivityType: null,
    loading: true,
    data: [],
    error: {}
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_ACTIVITIES_OF_TEACHER:
            return {
                ...state,
                loading: false,
                data: payload
            };
        case GET_ACTIVITIES_OF_TEACHER_ERROR:
            return {
                ...state,
                loading: false,
                data: null,
                error: payload
            };
        case AUTH_ERROR:
        case GET_REQUEST_FAIL:
            return {
                ...state,
                error: payload
            };
        default:
            return state;
    }
}
