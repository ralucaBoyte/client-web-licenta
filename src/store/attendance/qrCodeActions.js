import axios from "axios";
import { toast } from "react-toastify";
import { setAlert } from "../alert/alertActions";
import {reloadQuestionResponses, setCurrentAttendanceId} from "../reviews/reviewsActions";
export const SHOW_QR_ATTENDANCE = "SHOW_QR_ATTENDANCE";
export const SHOW_QR_ATTENDANCE_FAILED = "SHOW_QR_ATTENDANCE_FAILED";

export const SET_CURRENT_ACTIVITY_TYPE = "SET_CURRENT_ACTIVITY_TYPE";
export const SET_REMAINING_TIME = "SET_REMAINING_TIME";
export const SET_CURRENT_SUBJECT = "SET_CURRENT_SUBJECT";
export const SET_WEEK = "SET_WEEK";
export const CLEAR_QR = "CLEAR_QR";
export const GET_STUDENTS = "GET_STUDENTS";
export const SET_CURRENT_STUDENT = "SET_CURRENT_STUDENT";
export const MARK_ATTENDANCE = "MARK_ATTENDANCE";
export const MODAL_OPEN = "MODAL_OPEN";
export const SET_CURRENT_ATTENDANCE = "SET_CURRENT_ATTENDANCE";

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

        let attendance_info_id = Number(res.data.barcode.split("--")[0]);
        dispatch(setCurrentAttendanceId(attendance_info_id));
        //dispatch(reloadQuestionResponses());

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

export const markAttendance = (attendanceId, student) => async dispatch => {

    console.log(attendanceId);
    console.log(student);
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
            'Content-Type': 'application/json'
        }
    };
    const body = {
        "attendanceInfoId": attendanceId,
        "username": student
    };

    try {
        console.log("before post");
        const res = await axios.post("attendance/student", body, config);
        console.log(res);
        console.log(res.data);
        if(res.status >= 400) {
            dispatch(setAlert(res.message, "info"));
        }
        else {
            if (res.status === 200) {
                dispatch(setAlert(`You marked attendance for ${student}`, "info"));
            }

            dispatch({
                type: MARK_ATTENDANCE,
                payload: res.data
            });

        }

    } catch (err) {
        const status = err.status;

        if (status >= 400) {
            dispatch(setAlert(err.message, "danger"));
        }
        dispatch({
            type: SHOW_QR_ATTENDANCE_FAILED,
            payload: err
        });
    }
};

export const getStudents = () => async dispatch => {

    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.get("authentication/students", config);
        dispatch({
            type: GET_STUDENTS,
            payload: res.data
        });

    } catch (err) {
        const status = err.response.status;

        if (status === 400) {
            dispatch(setAlert("Can't get students", "danger"));
        }
        dispatch({
            type: SHOW_QR_ATTENDANCE_FAILED,
            payload: err
        });
    }
};

export const setCurrentActivity = (activity_id) => async dispatch => {
    console.log(activity_id);
    dispatch({
        type: SET_CURRENT_ACTIVITY_TYPE,
        payload: activity_id
    });
};

export const setCurrentStudent = (student) => async dispatch => {
    dispatch({
        type: SET_CURRENT_STUDENT,
        payload: student
    });
};

export const setRemainingTime = (remainingTime) => async dispatch => {
    dispatch({
        type: SET_REMAINING_TIME,
        payload: remainingTime
    });
};

export const setCurrentSubject = (currentSubject) => async dispatch => {
    console.log(currentSubject);
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


export const setQrVisibility = () => async dispatch => {
    dispatch({
        type: CLEAR_QR,
        payload: false
    });
};

export const setModalVisibility = (openModal) => async dispatch => {
    dispatch({
        type: MODAL_OPEN,
        payload: openModal
    });
};

