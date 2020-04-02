import { combineReducers } from "redux";
import alert from "./alert/alertReducer";
import auth from "./auth/authReducer";
import customers from "./customers/customerReducer";
import attendance from "./attendance/qrCodeReducer";
export default combineReducers({
  alert,
  auth,
  customers,
  attendance
});
