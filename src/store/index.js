import { combineReducers } from "redux";
import alert from "./alert/alertReducer";
import auth from "./auth/authReducer";
import customers from "./customers/customerReducer";
export default combineReducers({
  alert,
  auth,
  customers
});
