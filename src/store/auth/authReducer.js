import {
  // USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
} from "./authActions";

const initialState = {
  access_token: localStorage.getItem("access_token"),
  refresh_token: localStorage.getItem("refresh_token"),
  isAuthenticated: localStorage.getItem("isAuthenticated"),
  loading: true
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
    default:
      return state;
  }
}
