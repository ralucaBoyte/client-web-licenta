import {
   SHOW_ALL_ATTENDANCES,
    SHOW_ALL_ATTENDANCES_FAILED,
    SET_SUBJECT,
    SET_WEEK,
    SET_ACTIVITY,

} from "./attendanceViewActions";

const initialState = {
    subject_id: 1,
    week: 1,
    activity_id: 1,
    attendances: [],
    loadingAttendances: true,
    visible: false
};

export default function(state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case SHOW_ALL_ATTENDANCES:
            return {
                ...state,
                attendances: payload,
                loadingAttendances: false
            };

        case SHOW_ALL_ATTENDANCES_FAILED:

        case SET_SUBJECT:
            return{
                ...state,
                subject_id: payload
            };
        case SET_WEEK:
            return{
                ...state,
                week: payload
            };
        case SET_ACTIVITY:
            return{
                ...state,
                activity_id: payload
            };
        default:
            return state;
    }
}
