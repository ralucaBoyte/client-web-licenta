import { combineReducers } from "redux";
import alert from "./alert/alertReducer";
import auth from "./auth/authReducer";
import subjects from "./subjects/subjectReducer";
import attendance from "./attendance/qrCodeReducer";
import chat from "./chat/chatReducer";
import reviews from "./reviews/reviewsReducer";
import attendances_view from "./attendance/attendanceViewReducer";
export default combineReducers({
  alert,
  auth,
  attendance,
  attendances_view,
  subjects,
  chat,
  reviews
  });
