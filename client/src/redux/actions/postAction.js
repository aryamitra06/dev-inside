import { ALL_POSTS_FAIL, ALL_POSTS_REQUEST, ALL_POSTS_SUCCESS } from "../constants/types";
import axios from "axios";

export const allPostsAction = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_POSTS_REQUEST });
        const response = await axios.get("http://localhost:5000/posts");
        dispatch({ type: ALL_POSTS_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: ALL_POSTS_FAIL, payload: error.response.data });
    }
}