import {
  AUTH_ERROR,
  GET_SUBJECTS_BY_TEACHER,
  GET_SUBJECTS_BY_TEACHER_ERROR,
  GET_REQUEST_FAIL,
  SET_CURRENT_SUBJECT, GET_SUBJECTS_BY_STUDENT, GET_SUBJECTS_BY_STUDENT_ERROR
} from "./subjectActions";

const initialState = {
  currentSubject: null,
  loading: true,
  data: [],
  groups: [],
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_SUBJECTS_BY_TEACHER:
      return {
        ...state,
        loading: false,
        data: payload
      };
    case GET_SUBJECTS_BY_TEACHER_ERROR:
      return {
        ...state,
        loading: false,
        data: []
      };
    case GET_SUBJECTS_BY_STUDENT:
      return {
        ...state,
        loading: false,
        data: payload
      };
    case GET_SUBJECTS_BY_STUDENT_ERROR:
      return {
        ...state,
        loading: false,
        data: []
      };
    case SET_CURRENT_SUBJECT:
      return{
        ...state,
        currentSubject: payload
      };
    case AUTH_ERROR:
    case GET_REQUEST_FAIL:
    default:
      return state;
  }
}
