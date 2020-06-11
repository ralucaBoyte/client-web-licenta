import {
  // USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_USERNAME,
  SET_PASSWORD,
  SET_ROLE
} from "./authActions";

const initialState = {
  access_token: localStorage.getItem("access_token"),
  refresh_token: localStorage.getItem("refresh_token"),
  isAuthenticated: localStorage.getItem("isAuthenticated"),//?
  loading: true,
  username: localStorage.getItem("username"),
  password: localStorage.getItem("password"),
  role: localStorage.getItem("role")
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {

    case LOGIN_SUCCESS:
      localStorage.setItem("access_token", payload.access_token);
      localStorage.setItem("refresh_token", payload.refresh_token);
      localStorage.setItem("isAuthenticated", true);
      return {
        ...state,
        isAuthenticated: true,
        loading: false
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("isAuthenticated");
      return {
        ...state,
        access_token: null,
        refresh_token: null,
        isAuthenticated: false,
        loading: false
      };
    case SET_USERNAME:
      localStorage.setItem("username", payload);
      return {
        ...state,
        username: payload
      };
    case SET_PASSWORD:
      localStorage.setItem("password", payload);
      return{
        ...state,
        password: payload
      };
    case SET_ROLE:
      localStorage.setItem("role",payload);
      return{
        ...state,
        role: payload
      };
    default:
      return state;
  }
}
