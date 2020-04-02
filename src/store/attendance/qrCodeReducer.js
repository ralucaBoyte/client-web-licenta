import {
    SHOW_QR_ATTENDANCE,
    SHOW_QR_ATTENDANCE_FAILED
} from "./qrCodeActions";

const initialState = {
    qrCode: null,
    isAuthenticated: null,
    loading: true
};

export default function(state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case SHOW_QR_ATTENDANCE:
            return {
                ...state,
                qrCode: payload
            };

        case SHOW_QR_ATTENDANCE_FAILED:
            return {
                ...state
            };
        default:
            return state;
    }
}
