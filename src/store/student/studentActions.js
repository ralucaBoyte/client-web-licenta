import {setAlert} from "../alert/alertActions";
import axios from "axios";
import {GET_SUBJECTS_BY_TEACHER, GET_SUBJECTS_BY_TEACHER_ERROR} from "../subjects/subjectActions";

export const GET_REQUEST_FAIL = "GET_REQUEST_FAIL";
export const AUTH_ERROR = "AUTH_ERROR";

export const GET_STUDENT_BY_USERNAME = "GET_STUDENT_BY_USERNAME";
export const GET_STUDENT_BY_USERNAME_ERROR = "GET_STUDENT_BY_USERNAME_ERROR";
export const SET_CURRENT_STUDENT = "SET_CURRENT_STUDENT";
export const GET_STUDENTS_BY_SUBJECTS = "GET_STUDENTS_BY_SUBJECTS";
export const GET_STUDENTS_BY_SUBJECTS_ERROR = "GET_STUDENTS_BY_SUBJECTS_ERROR";

export const getStudentsBySubjects = (subjects) => async dispatch =>{

    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.get("student/subjects?subjectId="+subjects,config);
        console.log(res.data);
        dispatch({
            type: GET_STUDENTS_BY_SUBJECTS,
            payload: res.data.usernames
        });

    } catch (err) {
        const status = err.response.status;

        if (status === 404) {
            dispatch(setAlert("Cannot get students!", "danger"));
        }
        if (status === 405) {
            dispatch(setAlert("The request or response is not write in a good way!", "danger"));
        }
        if(status === 500){
            dispatch(setAlert("Please wait! It seem to be a problem on our server :(","danger"))
        }
        dispatch({
            type: GET_SUBJECTS_BY_TEACHER_ERROR,
            payload: err
        });
    }
};

export const setCurrentStudent = (currentStudent) => async dispatch => {

    dispatch({
        type: SET_CURRENT_STUDENT,
        payload: currentStudent
    })
};

const getSubjectIds = (subjects) => {
  return subjects.map(s => {
      return s.id
  });

};