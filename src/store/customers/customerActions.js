import axios from "axios";
import { setAlert } from "../alert/alertActions";

export const GET_CUSTOMERS = "GET_CUSTOMERS";
export const GET_REGUEST_FAIL = "GET_REGUEST_FAIL";
export const AUTH_ERROR = "AUTH_ERROR";

export const getCustomers = () => async dispatch => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.access_token}` }
    };
    const res = await axios.get("customers/services/profiles", config);

    dispatch({
      type: GET_CUSTOMERS,
      payload: res.data
    });
  } catch (err) {
    const status = err.response.status;
    if (status === 400) {
      dispatch(setAlert("Error getting customers", "danger"));
    }
    dispatch({
      type: GET_REGUEST_FAIL,
      payload: err
    });
  }
};
