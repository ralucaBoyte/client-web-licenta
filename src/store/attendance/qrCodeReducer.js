import {
    SHOW_QR_ATTENDANCE,
    SHOW_QR_ATTENDANCE_FAILED,
    SET_CURRENT_ACTIVITY_TYPE,
    SET_REMAINING_TIME,
    SET_CURRENT_SUBJECT,
    SET_WEEK, CLEAR_QR,
    GET_STUDENTS, SET_CURRENT_STUDENT, MARK_ATTENDANCE, MODAL_OPEN
} from "./qrCodeActions";

const initialState = {
    visible: false,
    value: "",
    activity_id: 1,
    activity_name: "",
    subject_id: 1,
    subject_name: "",
    remaining_time: 3,
    week: 1,
    students: null,
    currentStudent: '',
    marked: false,
    modalOpen: false,
    coundtdownvisible: true
};

export default function(state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case SHOW_QR_ATTENDANCE:
            return {
                ...state,
                visible: true,
                value: payload.barcode,
                coundtdownvisible: true
            };
        case CLEAR_QR:
            return {
                ...state,
                visible: false,
                coundtdownvisible: false
            };

        case GET_STUDENTS:
            return {
                ...state,
                students: payload
            };
        case MARK_ATTENDANCE:
            return {
                ...state,
                marked: payload
            };
        case SHOW_QR_ATTENDANCE_FAILED:
            return {
                ...state
            };
        case SET_CURRENT_ACTIVITY_TYPE:
            return{
                ...state,
                activity_id: payload
            };
        case SET_REMAINING_TIME:
            return{
                ...state,
                remaining_time: payload
            };
        case SET_CURRENT_SUBJECT:
            return{
                ...state,
                subject_id: payload.id,
                subject_name: payload.name
            };
        case SET_WEEK:
            return {
                ...state,
                week: payload
            };
        case SET_CURRENT_STUDENT:
            return {
                ...state,
                currentStudent: payload
            };
        case MODAL_OPEN:
            return {
                ...state,
                modalOpen: payload
            };
        default:
            return state;
    }
}
