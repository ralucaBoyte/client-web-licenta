import axios from "axios";
import {toast} from "react-toastify";

export const GET_SUBJECTS_BY_TEACHER = "GET_SUBJECTS_BY_TEACHER";
export const GET_SUBJECTS_BY_TEACHER_ERROR = "GET_SUBJECTS_BY_TEACHER_ERROR";
export const GET_SUBJECTS_BY_STUDENT = "GET_SUBJECTS_BY_STUDENT";
export const GET_SUBJECTS_BY_STUDENT_ERROR = "GET_SUBJECTS_BY_STUDENT_ERROR";
export const SET_CURRENT_SUBJECT = "SET_CURRENT_SUBJECT";
export const GET_ACTIVITIES_OF_TEACHER = "GET_ACTIVITIES_OF_TEACHER";
export const GET_ACTIVITIES_OF_TEACHER_ERROR = "GET_ACTIVITIES_OF_TEACHER_ERROR";

export const GET_REQUEST_FAIL = "GET_REQUEST_FAIL";
export const AUTH_ERROR = "AUTH_ERROR";

//by teacher
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

    if (status === 400 || status === 401 || status === 402) {
        toast.error("Va rugam sa va reautentificati");
    }
    if (status === 404) {
        toast.error(err.response.data);
    }
    if (status === 405) {
        toast.error(err.response.data);
    }
    if(status === 500){
        toast.error("A intervenit o eroare de sistem.\n Nu s-a putut încărca lista disciplinelor.");
    }

    dispatch({
      type: GET_SUBJECTS_BY_TEACHER_ERROR,
      payload: err
    });
  }
};

export const getSubjectsForStudent = () => async dispatch => {

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.access_token}`,
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.get("subject/student", config);
    console.log(res.data);
    dispatch({
      type: GET_SUBJECTS_BY_STUDENT,
      payload: res.data.subjects
    });

  } catch (err) {
    const status = err.response.status;

    if (status === 400 || status === 401 || status === 402) {
        toast.error(err.response.data);
    }
    if (status === 404) {
        toast.error(err.response.data);
    }
    if (status === 405) {
        toast.error(err.response.data);
    }
    dispatch({
      type: GET_SUBJECTS_BY_STUDENT_ERROR,
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
    console.info(status);
    if (status === 400 || status === 401 || status === 402) {
      toast.error("Va rugam sa va reautentificati");
    }
    if (status === 404) {
      toast.error("Nu exista activitati inregistrare");
    }
    if(status === 500){
      toast.error("Vă rugăm să repetați procesul.\n A intervenit o eroare de sistem.\n Verificați dacă datele sunt corecte.");
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
