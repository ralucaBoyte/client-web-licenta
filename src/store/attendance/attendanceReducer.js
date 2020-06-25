import {
    SHOW_QR_ATTENDANCE,
    SHOW_QR_ATTENDANCE_FAILED,
    SET_CURRENT_ACTIVITY_TYPE,
    ADD_ATTENDANCE,
    ADD_ATTENDANCE_ERROR,
    GET_ATTENDANCES_BY_TEACHER_ERROR,
    GET_ATTENDANCES_BY_TEACHER,
    GET_ATTENDANCES_BY_STUDENT,
    GET_ATTENDANCES_BY_STUDENT_ERROR
} from "./attendanceActions";

const initialState = {
    visible: false,
    value: null,
    activity_id: null,
    subject_id: null,
    attendance_id: null,
    error: "",
    loadingForTeacher: false,
    loadingForStudent: true,
    dataByTeacher: [],
    dataByStudent: [],
    subject: "",
    activity: ""
};

export default function(state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case SHOW_QR_ATTENDANCE:
            return {
                ...state,
                visible: true,
                value: payload,
                attendance_id: payload
            };

        case SHOW_QR_ATTENDANCE_FAILED:
            return {
                ...state,
                error: payload
            };
        case ADD_ATTENDANCE:
            return {
                ...state,
                subject: payload.course,
                activity: payload.activity
            };
        case ADD_ATTENDANCE_ERROR:
            return {
                ...state,
                error: payload
            };
        case SET_CURRENT_ACTIVITY_TYPE:
            return{
                ...state,
                activity_id: payload
            };
        case GET_ATTENDANCES_BY_TEACHER_ERROR:
            return{
                ...state,
                loadingForTeacher: false,
                dataByTeacher: null,
                visible: false
            };
        case GET_ATTENDANCES_BY_TEACHER:
            return{
                ...state,
                dataByTeacher: payload,
                visible: true
            };
        case GET_ATTENDANCES_BY_STUDENT_ERROR:
            return{
                ...state,
                loadingForStudent: true,
                dataByTeacher: null
            };
        case GET_ATTENDANCES_BY_STUDENT:
            return{
                ...state,
                loadingForStudent: false,
                dataByStudent: payload
            };
        default:
            return state;
    }
}
