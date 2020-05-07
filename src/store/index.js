import { combineReducers } from "redux";
import alert from "./alert/alertReducer";
import auth from "./auth/authReducer";
import subjects from "./subjects/subjectReducer";
import attendance from "./attendance/qrCodeReducer";
import activities from "./subjects/activityTypeReducer";
import students from "./student/studentReducer";

export default combineReducers({
  alert,
  auth,
  attendance,
  subjects,
  activities,
  students
  });
