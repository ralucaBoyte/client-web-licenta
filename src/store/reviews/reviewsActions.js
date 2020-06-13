import {setAlert} from "../alert/alertActions";
import axios from "axios";

export const GET_REVIEWS_FOR_PROFESSOR = "GET_REVIEWS_FOR_PROFESSOR";
export const GET_REVIEWS_FOR_PROFESSOR_ERROR = "GET_REVIEWS_FOR_PROFESSOR_ERROR";

export const getReviews = () => async dispatch => {

    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.access_token}`
        }
    };


    try {
        const reviews = await axios.get("authentication/reviews", config);
        dispatch({
            type: GET_REVIEWS_FOR_PROFESSOR,
            payload: reviews.data
        });

    } catch (err) {
        const status = err.response;
        if (status === 404) {
            dispatch(setAlert("Cannot get reviews for current professor!", "danger"));
        }
        dispatch({
            type: GET_REVIEWS_FOR_PROFESSOR_ERROR,
            payload: err
        });
    }
};
