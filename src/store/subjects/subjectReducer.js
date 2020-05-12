import {
  AUTH_ERROR,
  GET_SUBJECTS_BY_TEACHER,
  GET_SUBJECTS_BY_TEACHER_ERROR,
  GET_REGUEST_FAIL, GET_ACTIVITIES, GET_ACTIVITIES_FAIL
} from "./subjectActions";

const initialState = {
  currentSubject: null,
  loading: true,
  loadingActivities: true,
  data: [],
  error: {},
  activities: []
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
    case GET_ACTIVITIES:
      return {
        ...state,
        loadingActivities: false,
        activities: payload
      };
    case GET_ACTIVITIES_FAIL:
      return {
        ...state,
        loadingActivities: false,
        activities: null
      };
    case AUTH_ERROR:
    case GET_REGUEST_FAIL:
    default:
      return state;
  }
}
