import {setAlert} from "../alert/alertActions";
import axios from "axios";
import {SET_CURRENT_STUDENT} from "../attendance/qrCodeActions";


export const GET_REVIEWS_FOR_PROFESSOR = "GET_REVIEWS_FOR_PROFESSOR";
export const GET_REVIEWS_FOR_PROFESSOR_ERROR = "GET_REVIEWS_FOR_PROFESSOR_ERROR";
export const GET_REVIEW_FROM_STUDENTS = "GET_REVIEW_FROM_STUDENTS";
export const GET_QUESTIONS = "GET_QUESTIONS";
export const SET_CURRENT_ATTENDANCE_INFO = "SET_CURRENT_ATTENDANCE_INFO";
export const RELOAD_RESPONSE_FOR_QUESTIONS = "RELOAD_RESPONSE_FOR_QUESTIONS";

export const getReviews = () => async dispatch => {

    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.access_token}`
        }
    };


    try {
        const reviews = await axios.get("authentication/reviews", config);
        dispatch({
            type: GET_REVIEWS_FOR_PROFESSOR,
            payload: reviews.data
        });

    } catch (err) {
        const status = err.response;
        if (status === 404) {
            dispatch(setAlert("Cannot get reviews for current professor!", "danger"));
        }
        dispatch({
            type: GET_REVIEWS_FOR_PROFESSOR_ERROR,
            payload: err
        });
    }
};
export const getReviewsFromStudents = (attendanceId) => async dispatch => {

   // let attendance_info_id = attendanceId.split("--")[0];
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.access_token}`
        }
    };

    const body = {
        "attendanceInfoId": attendanceId,
    };


    try {
        const reviews = await axios.post("attendance/review-professor", body, config);
        dispatch({
            type: GET_REVIEW_FROM_STUDENTS,
            payload: reviews.data
        });

    } catch (err) {
        const status = err.response;
        if (status === 404) {
            dispatch(setAlert("Cannot get reviews for current professor!", "danger"));
        }
        dispatch({
            type: GET_REVIEW_FROM_STUDENTS,
            payload: err
        });
    }
};

export const getLatestAttendanceInfo = () => async dispatch => {

    // let attendance_info_id = attendanceId.split("--")[0];
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.access_token}`
        }
    };


    try {
        const latest = await axios.get("attendance/latest-attendance", config);
        console.log(latest);
        dispatch({
            type: SET_CURRENT_ATTENDANCE_INFO,
            payload: latest.data.attendance_info_id
        });

    } catch (err) {
        const status = err.response;
        if (status === 404) {
            dispatch(setAlert("Cannot get latest attendance info!", "danger"));
        }
        dispatch({
            type: GET_REVIEW_FROM_STUDENTS,
            payload: err
        });
    }
};

export const getQuestions = () => async dispatch => {

    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.access_token}`
        }
    };


    try {
        const questions = await axios.get("attendance/all-questions", config);
        dispatch({
            type: GET_QUESTIONS,
            payload: questions.data
        });

    } catch (err) {
        const status = err.response;
        if (status === 404) {
            dispatch(setAlert("Cannot get reviews for current professor!", "danger"));
        }
        dispatch({
            type: GET_QUESTIONS,
            payload: err
        });
    }
};

export const setCurrentAttendanceId = (id) => async dispatch => {
    dispatch({
        type: SET_CURRENT_ATTENDANCE_INFO,
        payload: id
    });
};

export const reloadQuestionResponses = () => async dispatch => {
    dispatch({
        type: RELOAD_RESPONSE_FOR_QUESTIONS,
        payload: null
    });
};


