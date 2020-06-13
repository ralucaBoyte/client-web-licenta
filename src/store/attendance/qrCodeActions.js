import axios from "axios";
import { setAlert } from "../alert/alertActions";
export const SHOW_QR_ATTENDANCE = "SHOW_QR_ATTENDANCE";
export const SHOW_QR_ATTENDANCE_FAILED = "SHOW_QR_ATTENDANCE_FAILED";

export const SET_CURRENT_ACTIVITY_TYPE = "SET_CURRENT_ACTIVITY_TYPE";
export const SET_REMAINING_TIME = "SET_REMAINING_TIME";
export const SET_CURRENT_SUBJECT = "SET_CURRENT_SUBJECT";
export const SET_WEEK = "SET_WEEK";

// Show qr code
export const getQRCode = (subject_id, activity_id, week, remaining_time) => async dispatch => {

    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
            'Content-Type': 'application/json'
        }
    };


    const body = {
        "courseId": subject_id,
        "activityId": activity_id,
        "week": week,
        "remainingTime": remaining_time
    };

    try {
        const res = await axios.post("attendance/info", body, config);
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

export const setRemainingTime = (remainingTime) => async dispatch => {
    dispatch({
        type: SET_REMAINING_TIME,
        payload: remainingTime
    });
};

export const setCurrentSubject = (currentSubject) => async dispatch => {
    dispatch({
        type: SET_CURRENT_SUBJECT,
        payload: currentSubject
    });
};

export const setWeek = (week) => async dispatch => {
    dispatch({
        type: SET_WEEK,
        payload: week
    });
};
