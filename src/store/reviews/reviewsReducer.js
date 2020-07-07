import {
    GET_REVIEWS_FOR_PROFESSOR,
    GET_REVIEWS_FOR_PROFESSOR_ERROR,
    GET_REVIEW_FROM_STUDENTS,
    GET_QUESTIONS,
    SET_CURRENT_ATTENDANCE_INFO,
    RELOAD_RESPONSE_FOR_QUESTIONS
} from "./reviewsActions";

const initialState = {
    currentReview: null,
    loading: true,
    loadingReviews: true,
    loadingReviewsFromStudents: true,
    loadingQuestions: true,
    reviews: [],
    error: {},
    reviewFromStudents: [],
    questions: [],
    currentAttendanceId: localStorage.getItem("currentAttendanceId"),
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_REVIEWS_FOR_PROFESSOR:
            return {
                ...state,
                loading: false,
                loadingReviews: false,
                reviews: payload
            };
        case GET_REVIEW_FROM_STUDENTS:
            return {
                ...state,
                loading: false,
                loadingReviewsFromStudents: false,
                reviewFromStudents: payload
            };

        case SET_CURRENT_ATTENDANCE_INFO:
            localStorage.setItem("currentAttendanceId", payload);
            return {
                ...state,
                currentAttendanceId: payload,
            };

        case GET_QUESTIONS:
            return {
                ...state,
                loading: false,
                loadingQuestions: false,
                questions: payload
            };
        case GET_REVIEWS_FOR_PROFESSOR_ERROR:
            return {
                ...state,
                loading: false,
                loadingReviews: false,
                reviews: null
            };

        case RELOAD_RESPONSE_FOR_QUESTIONS:
            return {
                ...state,
                loadingReviewsFromStudents: true,
            };
        default:
            return state;
    }
}
