import { ALL_POSTS_FAIL, ALL_POSTS_REQUEST, ALL_POSTS_SUCCESS, NEW_POST_FAIL, NEW_POST_REQUEST, NEW_POST_SUCCESS } from "../constants/types";
import axios from "axios";
import { tokenGetter } from "../../utils/tokenIdGetter";

export const allPostsAction = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_POSTS_REQUEST });
        const response = await axios.get("http://localhost:5000/posts");
        dispatch({ type: ALL_POSTS_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: ALL_POSTS_FAIL, payload: error.response.data });
    }
}

export const newPostAction = (formData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_POST_REQUEST });
        const response = await axios.post("http://localhost:5000/newpost", formData, { headers: { authorization: tokenGetter() } });
        dispatch({ type: NEW_POST_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: NEW_POST_FAIL, payload: error.response.data });
    }
}