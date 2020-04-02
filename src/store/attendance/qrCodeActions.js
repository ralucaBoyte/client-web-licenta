import axios from "axios";
import { setAlert } from "../alert/alertActions";
import * as qs from "qs";
export const SHOW_QR_ATTENDANCE = "SHOW_QR_ATTENDANCE";
export const SHOW_QR_ATTENDANCE_FAILED = "SHOW_QR_ATTENDANCE_FAILED";
export const ERROR = "ERROR";

// Show qr code
export const getQRCode = () => async dispatch => {
    const config = {
        headers: { Authorization: `Bearer ${localStorage.access_token}` }
    };

    const body = qs.stringify({
        barcode: "cevaaaa"
    });

    try {
        const res = await axios.post("attendance/qrcode", body, config);
        console.log(res);
        dispatch({
            type: SHOW_QR_ATTENDANCE,
            payload: res.data
        });

    } catch (err) {
        const status = err.response.status;

        if (status === 400) {
            dispatch(setAlert("Please enter an username and a password", "danger"));
        }
        dispatch({
            type: SHOW_QR_ATTENDANCE_FAILED,
            payload: err
        });
    }
};

