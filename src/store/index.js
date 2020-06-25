import { combineReducers } from "redux";
import auth from "./auth/authReducer";
import subjects from "./subjects/subjectReducer";
import attendance from "./attendance/attendanceReducer";
import activities from "./subjects/activityTypeReducer";
import students from "./student/studentReducer";
import groups from "./student/groupReducer"
import grades from "./student/gradesReducer"

export default combineReducers({
  auth,
  attendance,
  subjects,
  activities,
  students,
  groups,
  grades
  });
