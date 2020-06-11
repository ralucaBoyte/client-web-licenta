import axios from "axios";
import { setAlert } from "../alert/alertActions";
import * as qs from "qs";
import { toast } from "react-toastify";
import {ADD_ATTENDANCE, ADD_ATTENDANCE_ERROR} from "../attendance/qrCodeActions";
//export const USER_LOADED = "USER_LOADED";
export const AUTH_ERROR = "AUTH_ERROR";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGOUT = "LOGOUT";
export const ACCOUNT_DELETED = "ACCOUNT_DELETED";
export const SET_USERNAME = "SET_USERNAME";
export const SET_PASSWORD = "SET_PASSWORD";
export const SET_ROLE = "SET_ROLE";

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
    //set username and password of current user
    // setUsernameAndPassword(username,password);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

  } catch (err) {
    const status = err.response.status;
    if (status === 400) {
      //dispatch(setAlert("Please enter an username and a password", "danger"));
      toast.error(err.response.data);
    }
    if(status === 500){
      // dispatch(setAlert("Please wait! It seem to be a problem on our server :(","danger"));
      toast.error("Datele introduse nu sunt valabile");
    }
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

//Get the role of a user
export const getRole = () => async dispatch =>{

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.access_token}`,
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.get("authentication/role", config);
    //console.log(res.data);
    dispatch({
      type: SET_ROLE,
      payload: res.data.role
    });
    console.log(res.data.role+ "-----");

  } catch (err) {
    const status = err.response.status;

    if (status === 400 || status === 401 || status === 402) {
      dispatch(setAlert("Please enter an username and a password", "danger"));
    }
    if(status === 403){ //TODO: set error messages
      dispatch(setAlert("It seems the request is forbidden","danger"))
    }
    // dispatch({
    //   type: ADD_ATTENDANCE_ERROR,
    //   payload: err
    // });

  }
};

export const setUsernameAndPassword = (u,p) => dispatch =>{
  dispatch({
    type: SET_USERNAME,
    payload: u
  });
  dispatch({
    type: SET_PASSWORD,
    payload: p
  });
};
