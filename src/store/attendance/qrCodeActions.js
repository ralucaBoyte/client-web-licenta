import axios from "axios";
import { setAlert } from "../alert/alertActions";
export const SHOW_QR_ATTENDANCE = "SHOW_QR_ATTENDANCE";
export const SHOW_QR_ATTENDANCE_FAILED = "SHOW_QR_ATTENDANCE_FAILED";

export const SET_CURRENT_ACTIVITY_TYPE = "SET_CURRENT_ACTIVITY_TYPE";

// Show qr code
export const getQRCode = (activity_id) => async dispatch => {

    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
            'Content-Type': 'application/json'
        }
    };


    const body = {
        "courseId": 2,
        "activityId": activity_id,
        "remainingTime": 25
    };

    try {
        const res = await axios.post("attendance/info", body, config);
        //console.log(res.data);
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

export const setCurrentActivity = (activity_id) => async dispatch => {
    dispatch({
        type: SET_CURRENT_ACTIVITY_TYPE,
        payload: activity_id
    });
};
