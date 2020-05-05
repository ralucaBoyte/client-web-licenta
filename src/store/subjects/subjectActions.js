import {setAlert} from "../alert/alertActions";

export const GET_SUBJECTS_BY_TEACHER = "GET_SUBJECTS_BY_TEACHER";
export const GET_SUBJECTS_BY_TEACHER_ERROR = "GET_SUBJECTS_BY_TEACHER_ERROR";

export const GET_REGUEST_FAIL = "GET_REGUEST_FAIL";
export const AUTH_ERROR = "AUTH_ERROR";

export const getSubjects = () => async dispatch => {

  try {
    const res = {
      data: [
        {
          subject_id: 1,
          credits: 4,
          name: "FP",
          year: 1
        },
        {
          subject_id: 2,
          credits: 5,
          name: "ASC",
          year: 2
        },
        {
          subject_id: 3,
          credits: 5,
          name: "SO",
          year: 1
        },
        {
          subject_id: 4,
          credits: 6,
          name: "OOP",
          year: 3
        }
      ]
    };
    dispatch({
      type: GET_SUBJECTS_BY_TEACHER,
      payload: res.data
    });

  } catch (err) {
    const status = err.response.status;
    if (status === 404) {
      dispatch(setAlert("Cannot get subjects!", "danger"));
    }
    dispatch({
      type: GET_SUBJECTS_BY_TEACHER_ERROR,
      payload: err
    });
  }
};
