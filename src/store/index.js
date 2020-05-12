import { combineReducers } from "redux";
import alert from "./alert/alertReducer";
import auth from "./auth/authReducer";
import subjects from "./subjects/subjectReducer";
import attendance from "./attendance/qrCodeReducer";
import chat from "./chat/chatReducer";
export default combineReducers({
  alert,
  auth,
  attendance,
  subjects,
  chat
  });
