import {
    SHOW_QR_ATTENDANCE,
    SHOW_QR_ATTENDANCE_FAILED,
    SET_CURRENT_ACTIVITY_TYPE,
    ADD_ATTENDANCE,
    ADD_ATTENDANCE_ERROR
} from "./qrCodeActions";

const initialState = {
    visible: false,
    value: null,
    activity_id: null,
    subject_id: null,
    attendance_id: null
};

export default function(state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case SHOW_QR_ATTENDANCE:
            return {
                ...state,
                visible: true,
                value: payload.barcode,
                attendance_id: payload.barcode[0]
            };

        case SHOW_QR_ATTENDANCE_FAILED:
            return {
                ...state
            };
        case ADD_ATTENDANCE:
            return {
                ...state
            };
        case ADD_ATTENDANCE_ERROR:
            return {
                ...state
            };
        case SET_CURRENT_ACTIVITY_TYPE:
            return{
                ...state,
                activity_id: payload
            };
        default:
            return state;
    }
}
