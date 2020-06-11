import {
    AUTH_ERROR,
    GET_REQUEST_FAIL,
    GET_STUDENT_BY_USERNAME,
    GET_STUDENT_BY_USERNAME_ERROR, GET_STUDENTS_BY_SUBJECTS, GET_STUDENTS_BY_SUBJECTS_ERROR,
    SET_CURRENT_STUDENT, SET_STUDENTS
} from "./studentActions";

const initialState = {
    currentStudent: null,
    loading: true,
    data: [],
    error: {},
    visible: false
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_STUDENT_BY_USERNAME:
            return {
                ...state,
                loading: false,
                data: payload
            };
        case GET_STUDENT_BY_USERNAME_ERROR:
            return {
                ...state,
                loading: false,
                data: null
            };
        case GET_STUDENTS_BY_SUBJECTS:
            return {
                ...state,
                loading: false,
                data: payload,
                visible: true
            };
        case GET_STUDENTS_BY_SUBJECTS_ERROR:
            return {
                ...state,
                loading: false,
                data: null
            };
        case SET_CURRENT_STUDENT:
            return{
                ...state,
                currentSubject: payload
            };
        case SET_STUDENTS:
            return {
                ...state,
                data: payload
            };
        case AUTH_ERROR:
        case GET_REQUEST_FAIL:
        default:
            return state;
    }
}