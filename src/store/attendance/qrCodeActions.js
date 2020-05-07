import axios from "axios";
import { setAlert } from "../alert/alertActions";

export const SHOW_QR_ATTENDANCE = "SHOW_QR_ATTENDANCE";
export const SHOW_QR_ATTENDANCE_FAILED = "SHOW_QR_ATTENDANCE_FAILED";
export const ADD_ATTENDANCE = "ADD_ATTENDANCE";
export const ADD_ATTENDANCE_ERROR = "ADD_ATTENDANCE_ERROR";
export const SET_CURRENT_ACTIVITY_TYPE = "SET_CURRENT_ACTIVITY_TYPE";

const config = {
    headers: {
        Authorization: `Bearer ${localStorage.access_token}`,
        'Content-Type': 'application/json'
    }
};

// Show qr code
export const getQRCode = (activity_id,course_id) => async dispatch => {

    console.log("ACTIVITY ID "+activity_id);
    console.log("COURSE ID "+course_id);
    const body = {
        "courseId": course_id,
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


//TODO: print a message when attendance is added
export const addAttendance = (attendanceInfoId,studentId) => async dispatch => {

    const body = {
        attendanceInfoId : attendanceInfoId
    };

    try {
        const res = await axios.post("attendance/teacher?studentId="+studentId, body, config);
        //console.log(res.data);
        dispatch({
            type: ADD_ATTENDANCE,
            payload: res.data
        });
        console.log(res.data.course+ "-----"+res.data.activity);

    } catch (err) {
        const status = err.response.status;

        if (status === 400 || status === 401 || status === 402) {
            dispatch(setAlert("Please enter an username and a password", "danger"));
        }
        if(status === 403){ //TODO: set error messages
            dispatch(setAlert("It seems the request is forbidden","danger"))
        }
        dispatch({
            type: ADD_ATTENDANCE_ERROR,
            payload: err
        });
    }
};

export const setCurrentActivity = (activity_id) => async dispatch => {
    // console.log("set activity type id  "+ activity_id);
    dispatch({
        type: SET_CURRENT_ACTIVITY_TYPE,
        payload: activity_id
    });
};

