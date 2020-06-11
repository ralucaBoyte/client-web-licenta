import axios from "axios";
import { setAlert } from "../alert/alertActions";
import {toast} from "react-toastify";

export const SHOW_QR_ATTENDANCE = "SHOW_QR_ATTENDANCE";
export const SHOW_QR_ATTENDANCE_FAILED = "SHOW_QR_ATTENDANCE_FAILED";
export const ADD_ATTENDANCE = "ADD_ATTENDANCE";
export const ADD_ATTENDANCE_ERROR = "ADD_ATTENDANCE_ERROR";
export const SET_CURRENT_ACTIVITY_TYPE = "SET_CURRENT_ACTIVITY_TYPE";


// Show qr code
export const getQRCode = (activity_id,course_id) => async dispatch => {

    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
            'Content-Type': 'application/json'
        }
    };

    console.log("ACTIVITY ID "+activity_id);
    console.log("COURSE ID "+course_id);
    const body = {
        "courseId": course_id,
        "activityId": activity_id,
        "remainingTime": 25
    };

    try {
        console.log(body+"----"+config.headers.Authorization);
        const res = await axios.post("attendance/info", body, config);
        console.log(res.data);
        const code = res.data.barcode.split('--')[0];
        console.log(code);
        dispatch({
            type: SHOW_QR_ATTENDANCE,
            payload: code
        });

    } catch (err) {
        console.info(err);
        const status = err.response.status;
        console.log("eroare: "+err.response.data);
        if (status === 400) {
            // dispatch(setAlert("Please enter an username and a password", "danger"));
            // console.log("eroare: "+status);
            dispatch({
                type: SHOW_QR_ATTENDANCE_FAILED,
                payload: err.response.data
            });
        }
        dispatch({
            type: SHOW_QR_ATTENDANCE_FAILED,
            payload: err.response.status
        });


    }
};


//TODO: print a message when attendance is added
export const addAttendance = (attendanceInfoId,studentId) => async dispatch => {

    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
            'Content-Type': 'application/json'
        }
    };

    const body = {
        attendanceInfoId : attendanceInfoId
    };

    try {
        const res = await axios.post("attendance/teacher?studentId="+studentId, body, config);
        //console.log(res.data);
        console.log(res.data.course+ "-----"+res.data.activity);
        dispatch({
            type: ADD_ATTENDANCE,
            payload: res.data
        });


    } catch (err) {
        const status = err.response.status;

        if (status === 400 || status === 401 || status === 402) {
            dispatch(setAlert("Please enter an username and a password", "danger"));
            toast.error(err.response.data);
        }
        if(status === 403){ //TODO: set error messages
            dispatch(setAlert("It seems the request is forbidden","danger"));
            toast.error(err.response.data);
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

