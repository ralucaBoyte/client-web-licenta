import {setAlert} from "../alert/alertActions";
import axios from "axios";

export const GET_SUBJECTS_BY_TEACHER = "GET_SUBJECTS_BY_TEACHER";
export const GET_SUBJECTS_BY_TEACHER_ERROR = "GET_SUBJECTS_BY_TEACHER_ERROR";

export const GET_REGUEST_FAIL = "GET_REGUEST_FAIL";
export const AUTH_ERROR = "AUTH_ERROR";

export const GET_ACTIVITIES = "GET_ACTIVITIES";
export const GET_ACTIVITIES_FAIL = "GET_ACTIVITIES_FAIL";

export const getSubjects = () => async dispatch => {

    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
            //'Content-Type': 'application/json'
        }
    };

  try {
      const subjects = await axios.get("attendance/subjects", config);
      console.log(subjects.data);
      /*const res = {
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
    };*/
    dispatch({
      type: GET_SUBJECTS_BY_TEACHER,
      payload: subjects.data
    });

  } catch (err) {
    const status = err.response;
    if (status === 404) {
      dispatch(setAlert("Cannot get subjects!", "danger"));
    }
    dispatch({
      type: GET_SUBJECTS_BY_TEACHER_ERROR,
      payload: err
    });
  }
};

export const getActivities = () => async dispatch => {

    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
        }
    };

    try {
        const activities = await axios.get("attendance/activities", config);
        console.log(activities);

        dispatch({
            type: GET_ACTIVITIES,
            payload: activities.data
        });

    } catch (err) {
        const status = err.response;
        if (status === 404) {
            dispatch(setAlert("Cannot get activities!", "danger"));
        }
        dispatch({
            type: GET_ACTIVITIES_FAIL,
            payload: err
        });
    }
};

