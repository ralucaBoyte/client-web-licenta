import axios from "axios";
import { setAlert } from "../alert/alertActions";
import * as qs from "qs";
import {getLatestAttendanceInfo} from "../reviews/reviewsActions";
//export const USER_LOADED = "USER_LOADED";
export const AUTH_ERROR = "AUTH_ERROR";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGOUT = "LOGOUT";
export const ACCOUNT_DELETED = "ACCOUNT_DELETED";
export const SAVE_USER = "SAVE_USER";

/* Load User
export const loadUser = () => async dispatch => {
  if (localStorage.access_token) {
    setAuthToken(localStorage.access_token);
  }
};*/

// Login User
export const login = (username, password) => async dispatch => {
  const config = {
    headers: {
      "content-type": "application/x-www-form-urlencoded;charset=utf-8"
    }
  };

  const data = qs.stringify({
    username: username,
    password: password
  });

  try {
    const res = await axios.post("authentication/login", data, config);
    console.log(res);
    console.log(res.data);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch({
      type:SAVE_USER,
      payload: username
    });

  } catch (err) {

    console.log(err.response);

    dispatch(setAlert(err.response.data.message, "danger"));

    dispatch({
      type: LOGIN_FAIL,
      payload: err
    });
  }
};



// Logout / Clear Profile
export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
};
