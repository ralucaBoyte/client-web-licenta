import axios from "axios";
import { setAlert } from "../alert/alertActions";
import {LOGIN_FAIL, SAVE_USER} from "../auth/authActions";

export const SHOW_ALL_ATTENDANCES = "SHOW_ALL_ATTENDANCES";
export const SHOW_ALL_ATTENDANCES_FAILED = "SHOW_ALL_ATTENDANCES_FAILED";
export const SET_SUBJECT = "SET_SUBJECT";
export const SET_WEEK = "SET_WEEK";
export const SET_ACTIVITY = "SET_ACTIVITY";
export const DELETE_ATTENDANCE = "DELETE_ATTENDANCE";


// Show qr code
export const getAttendances = (subject_id, activity_id, week) => async dispatch => {

    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
            'Content-Type': 'application/json'
        }
    };


    const body = {
        "course_id": subject_id,
        "activity_id": activity_id,
        "week": week
    };

    try {
        const res = await axios.post("attendance/view", body, config);
        console.log(res.data);
        dispatch({
            type: SHOW_ALL_ATTENDANCES,
            payload: res.data
        });

    } catch (err) {
        const status = err.response.status;

        if (status === 400) {
            dispatch(setAlert("Error getting attendances", "danger"));
        }
        dispatch({
            type: SHOW_ALL_ATTENDANCES_FAILED,
            payload: err
        });
    }
};

export const deleteAttendances = (student_id, subject_id, activity_id, week) => async dispatch => {

    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
            'Content-Type': 'application/json'
        }
    };

        try {
            console.log(student_id);
            console.log(subject_id);
            console.log(week);
        let url = `attendance/delete-attendance/${student_id}/${subject_id}/${activity_id}/${week}`;
        const res = await axios.delete(url, config);
        console.log(res.data);
        dispatch({
            type: DELETE_ATTENDANCE,
            payload: res.data
        });

    } catch (err) {
        const status = err.response.status;

        if (status === 400) {
            dispatch(setAlert("Error DELETING attendances", "danger"));
        }
        // dispatch({
        //     type: SHOW_ALL_ATTENDANCES_FAILED,
        //     payload: err
        // });
    }
};



export const setCurrentSubject = (currentSubject) => async dispatch => {
    dispatch({
        type: SET_SUBJECT,
        payload: currentSubject
    });
};


export const setWeek = (week) => async dispatch => {
    dispatch({
        type: SET_WEEK,
        payload: week
    });
};

export const setActivity = (activity) => async dispatch => {
    dispatch({
        type: SET_ACTIVITY,
        payload: activity
    });
};
