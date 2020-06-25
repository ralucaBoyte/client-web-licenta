import axios from "axios";
import * as qs from "qs";
import { toast } from "react-toastify";
export const AUTH_ERROR = "AUTH_ERROR";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGOUT = "LOGOUT";
export const ACCOUNT_DELETED = "ACCOUNT_DELETED";
export const SET_USERNAME = "SET_USERNAME";
export const SET_PASSWORD = "SET_PASSWORD";
export const SET_ROLE = "SET_ROLE";
export const SET_GROUP = "SET_GROUP";



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
    console.log(res.data.access_token);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

  } catch (err) {
    const status = err.response.status;
    if (status === 400) {
      toast.error("Verificați dacă datele sunt corecte.");
    }
    if(status >= 500){
      toast.error("Vă rugăm să repetați procesul.\n A intervenit o eroare de sistem.\n Verificați dacă datele sunt corecte.");
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

export const getGroup = () => async dispatch =>{
  console.log("before");
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.access_token}`,
      'Content-Type': 'application/json'
    }
  };

  try {

    const res = await axios.get("student/group", config);
    console.log(res.data+" after");
    dispatch({
      type: SET_GROUP,
      payload: res.data.name
    });

  } catch (err) {
    const status = err.response.status;

    if (status === 400 || status === 401 || status === 402) {
      toast.error(err.response.data);
    }
    if(status === 403){
      toast.error("Nu sunteti autorizati pentru a efectua aceasta operatiune");
    }
  }
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

    if (res.data.role === "STUDENT"){
      getGroup()(dispatch)
    }else{
      setGroup(null)(dispatch);
    }
    dispatch({
      type: SET_ROLE,
      payload: res.data.role
    });


  } catch (err) {
    const status = err.response.status;

    if (status === 400 || status === 401 || status === 402) {
      toast.error(err.response.data);
    }
    if(status === 403){
      toast.error("Nu sunteti autorizati pentru a efectua aceasta operatiune");
    }

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



export const setGroup = (group) => dispatch =>{
  dispatch({
    type: SET_GROUP,
    payload: group
  })
};
