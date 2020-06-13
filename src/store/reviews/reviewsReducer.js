import {
    GET_REVIEWS_FOR_PROFESSOR,
    GET_REVIEWS_FOR_PROFESSOR_ERROR,
} from "./reviewsActions";

const initialState = {
    currentReview: null,
    loading: true,
    loadingReviews: true,
    reviews: [],
    error: {},
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
        case GET_REVIEWS_FOR_PROFESSOR_ERROR:
            return {
                ...state,
                loading: false,
                loadingReviews: false,
                reviews: null
            };
        default:
            return state;
    }
}
