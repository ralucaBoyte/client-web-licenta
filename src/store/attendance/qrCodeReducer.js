import {
    SHOW_QR_ATTENDANCE,
    SHOW_QR_ATTENDANCE_FAILED,
    SET_CURRENT_ACTIVITY_TYPE,
    SET_REMAINING_TIME,
    SET_CURRENT_SUBJECT,
    SET_WEEK
} from "./qrCodeActions";

const initialState = {
    visible: false,
    value: "",
    activity_id: 1,
    subject_id: 1,
    remaining_time: 3,
    week: 1
};

export default function(state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case SHOW_QR_ATTENDANCE:
            return {
                ...state,
                visible: true,
                value: payload.barcode
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
                subject_id: payload
            };
        case SET_WEEK:
            return {
                ...state,
                week: payload
            };
        default:
            return state;
    }
}
