import {
    SHOW_QR_ATTENDANCE,
    SHOW_QR_ATTENDANCE_FAILED
} from "./qrCodeActions";

const initialState = {
    visible: false,
    value: null
};

export default function(state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case SHOW_QR_ATTENDANCE:
            return {
                visible: true,
                value: payload.barcode
            };

        case SHOW_QR_ATTENDANCE_FAILED:
            return {
                ...state
            };
        default:
            return state;
    }
}
