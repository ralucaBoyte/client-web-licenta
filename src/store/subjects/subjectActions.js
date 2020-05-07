import {setAlert} from "../alert/alertActions";
import axios from "axios";
import {SHOW_QR_ATTENDANCE, SHOW_QR_ATTENDANCE_FAILED} from "../attendance/qrCodeActions";

export const GET_SUBJECTS_BY_TEACHER = "GET_SUBJECTS_BY_TEACHER";
export const GET_SUBJECTS_BY_TEACHER_ERROR = "GET_SUBJECTS_BY_TEACHER_ERROR";
export const SET_CURRENT_SUBJECT = "SET_CURRENT_SUBJECT";
export const GET_ACTIVITIES_OF_TEACHER = "GET_ACTIVITIES_OF_TEACHER";
export const GET_ACTIVITIES_OF_TEACHER_ERROR = "GET_ACTIVITIES_OF_TEACHER_ERROR";

export const GET_REQUEST_FAIL = "GET_REQUEST_FAIL";
export const AUTH_ERROR = "AUTH_ERROR";

export const getSubjects = () => async dispatch => {

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.access_token}`,
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.get("subject/teacher", config);
    console.log(res.data);
    dispatch({
      type: GET_SUBJECTS_BY_TEACHER,
      payload: res.data.subjects
    });

  } catch (err) {
    const status = err.response.status;

    if (status === 400 || status === 401 || status === 402) { //TODO
      dispatch(setAlert("Please enter an username and a password", "danger"));
    }
    if (status === 404) {
        dispatch(setAlert("Cannot get subjects!", "danger"));
    }
    if (status === 405) {
      dispatch(setAlert("The request or response is not write in a good way!", "danger"));
    }
    dispatch({
      type: GET_SUBJECTS_BY_TEACHER_ERROR,
      payload: err
    });
  }

};

export const getActivityTypesByTeacher = () => async dispatch =>{

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.access_token}`,
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.get("subject/activities", config);
    console.log(res.data);
    dispatch({
      type: GET_ACTIVITIES_OF_TEACHER,
      payload: res.data.activities
    });

  } catch (err) {
    const status = err.response.status;

    if (status === 400 || status === 401 || status === 402) {
      dispatch(setAlert("Please enter an username and a password", "danger"));
    }
    if (status === 404) {
      dispatch(setAlert("Cannot get activities!", "danger"));
    }
    if (status === 405) {
      dispatch(setAlert("The request or response is not write in a good way!", "danger"));
    }
    if(status === 500){
      dispatch(setAlert("Please wait! It seem to be a problem on our server :(","danger"))
    }
    dispatch({
      type: GET_ACTIVITIES_OF_TEACHER_ERROR,
      payload: err
    });
  }
};

export const setCurrentSubject = (currentSubject) => async dispatch => {
  dispatch({
    type: SET_CURRENT_SUBJECT,
    payload: currentSubject
  })
};
