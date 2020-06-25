import axios from "axios";
import {toast} from "react-toastify";

export const SHOW_QR_ATTENDANCE = "SHOW_QR_ATTENDANCE";
export const SHOW_QR_ATTENDANCE_FAILED = "SHOW_QR_ATTENDANCE_FAILED";
export const ADD_ATTENDANCE = "ADD_ATTENDANCE";
export const ADD_ATTENDANCE_ERROR = "ADD_ATTENDANCE_ERROR";
export const SET_CURRENT_ACTIVITY_TYPE = "SET_CURRENT_ACTIVITY_TYPE";
export const GET_ATTENDANCES_BY_TEACHER = "GET_ATTENDANCES_BY_TEACHER";
export const GET_ATTENDANCES_BY_STUDENT = "GET_ATTENDANCES_BY_STUDENT";
export const GET_ATTENDANCES_BY_TEACHER_ERROR = "GET_ATTENDANCES_BY_TEACHER_ERROR";
export const GET_ATTENDANCES_BY_STUDENT_ERROR = "GET_ATTENDANCES_BY_STUDENT_ERROR";


export const getCode = (activity_id,course_id) => async dispatch => {

    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
            'Content-Type': 'application/json'
        }
    };

    const body = {
        "courseId": course_id,
        "activityId": activity_id,
        "remainingTime": 25
    };

    try {

        const res = await axios.post("attendance/info", body, config);
        dispatch({
            type: SHOW_QR_ATTENDANCE,
            payload: res.data.barcode
        });

    } catch (err) {
        console.info(err);
        const status = err.response.status;
        if (status === 400) {
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


export const addAttendance = (attendanceInfoId,studentId) => async dispatch => {

    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
            'Content-Type': 'application/json'
        }
    };

    const body = {
        attendanceInfoCode : attendanceInfoId
    };

    try {
        const res = await axios.post("attendance/teacher?studentId="+studentId, body, config);

        toast.info("Studentul "+studentId+" are prezenta la disciplina "+ res.data.course+" la activitatea "+res.data.activity);
        dispatch({
            type: ADD_ATTENDANCE,
            payload: res.data
        });


    } catch (err) {
        const status = err.response.status;
        console.log(err.response.data);
        if (status === 400 || status === 401 || status === 402) {
            toast.error(err.response.data);
        }
        if(status === 403){
            toast.error(err.response.data);
        }
        if(status >= 500){
            toast.error("Vă rugăm să repetați procesul.\n A intervenit o eroare de sistem.");
        }
        dispatch({
            type: ADD_ATTENDANCE_ERROR,
            payload: err
        });
    }
};

export const addAttendanceByStudent = (attendanceInfoId) => async dispatch => {

    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
            'Content-Type': 'application/json'
        }
    };

    const body = {
        attendanceInfoCode : attendanceInfoId
    };

    try {
        const res = await axios.post("attendance/student", body, config);

        toast.info("Studentul are prezenta la disciplina "+ res.data.course+" la activitatea "+res.data.activity);
        dispatch({
            type: ADD_ATTENDANCE,
            payload: res.data
        });


    } catch (err) {
        const status = err.response.status;
        console.log(err.response.data);
        if (status === 400 ) {
            toast.error("Codul pentru prezență a expirat sau este invalid!");
        }
        if(status === 403 || status === 401 || status === 402){
            toast.error(err.response.data);
        }
        if(status >= 500){
            toast.error("Vă rugăm să repetați procesul.\n A intervenit o eroare de sistem.");
        }
        dispatch({
            type: ADD_ATTENDANCE_ERROR,
            payload: err
        });
    }
};

export const getAttendanceByTeacher = (studentId) => async dispatch =>{

    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.get("attendance/teacher?studentId="+studentId,config);
        console.log(res.data.attendances);
        dispatch({
            type: GET_ATTENDANCES_BY_TEACHER,
            payload: res.data.attendances
        });

    } catch (err) {
        const status = err.response.status;

        if (status === 404) {
            toast.error(err.response.data);
        }
        if (status === 405) {
            toast.error(err.response.data);
        }
        if(status === 500){
            toast.error("A intervenit o eroare de sistem.\n Nu s-a putut încărca lista prezențelor.");
        }
        dispatch({
            type: GET_ATTENDANCES_BY_TEACHER_ERROR,
            payload: err
        });
    }
};

export const getAttendanceByStudent = () => async dispatch =>{

    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.get("attendance/student",config);
        console.log(res.data.attendances);
        dispatch({
            type: GET_ATTENDANCES_BY_STUDENT,
            payload: res.data.attendances
        });

    } catch (err) {
        const status = err.response.status;

        if (status === 404) {
            toast.error(err.response.data);
        }
        if (status === 405) {
            toast.error(err.response.data);
        }
        if(status === 500){
            toast.error("A intervenit o eroare de sistem.\n Nu s-a putut încărca lista prezențelor.");
        }
        dispatch({
            type: GET_ATTENDANCES_BY_STUDENT_ERROR,
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

