import {
  AUTH_ERROR,
  GET_SUBJECTS_BY_TEACHER,
  GET_SUBJECTS_BY_TEACHER_ERROR,
  GET_REGUEST_FAIL
} from "./subjectActions";

const initialState = {
  currentSubject: null,
  loading: true,
  data: [],
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
        data: null
      };
    case AUTH_ERROR:
    case GET_REGUEST_FAIL:
    default:
      return state;
  }
}
