import { AUTH_ERROR, GET_CUSTOMERS, GET_REGUEST_FAIL } from "./customerActions";

const initialState = {
  access_token: localStorage.getItem("access_token"),
  isAuthenticated: null,
  loading: true,
  data: []
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_CUSTOMERS:
      return {
        ...state,
        loading: false,
        data: payload
      };
    case AUTH_ERROR:
    case GET_REGUEST_FAIL:
    default:
      return state;
  }
}
