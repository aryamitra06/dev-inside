import { ALL_POSTS_FAIL, ALL_POSTS_REQUEST, ALL_POSTS_SUCCESS, NEW_POST_FAIL, NEW_POST_REQUEST, NEW_POST_SUCCESS, POST_BY_ID_FAIL, POST_BY_ID_REQUEST, POST_BY_ID_SUCCESS, UPDATE_LIKES_SUCCESS, UPDATE_LIKES_REQUEST, UPDATE_LIKES_FAIL, DELETE_POST_REQUEST, DELETE_POST_FAIL, DELETE_POST_SUCCESS, ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAIL, REMOVE_COMMENT_REQUEST, REMOVE_COMMENT_SUCCESS, REMOVE_COMMENT_FAIL } from "../constants/types";
import axios from "axios";
import { tokenGetter } from "../../utils/tokenExtractor";

export const allPostsAction = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_POSTS_REQUEST });
        const response = await axios.get("https://devinside-backend-service.onrender.com/posts");
        dispatch({ type: ALL_POSTS_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: ALL_POSTS_FAIL, payload: error.response.data });
    }
}

export const postByIdAction = (id) => async (dispatch) => {
    try {
        dispatch({ type: POST_BY_ID_REQUEST });
        const response = await axios.get(`https://devinside-backend-service.onrender.com/post/${id}`);
        dispatch({ type: POST_BY_ID_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: POST_BY_ID_FAIL, payload: error.response.data });
    }
}
export const newPostAction = (formData, onClose, resetPostHandler) => async (dispatch) => {
    try {
        dispatch({ type: NEW_POST_REQUEST });
        const response = await axios.post("https://devinside-backend-service.onrender.com/newpost", formData, { headers: { authorization: tokenGetter() } });
        dispatch({ type: NEW_POST_SUCCESS, payload: response.data });
        onClose();
        resetPostHandler();
    } catch (error) {
        dispatch({ type: NEW_POST_FAIL, payload: error.response.data });
    }
}

export const addLikeAction = (postId) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_LIKES_REQUEST });
        const response = await axios.put(`https://devinside-backend-service.onrender.com/like/new/${postId}`, postId, { headers: { authorization: tokenGetter() } });
        dispatch({ type: UPDATE_LIKES_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: UPDATE_LIKES_FAIL, payload: error.response.data });
    }
}

export const unLikeAction = (postId) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_LIKES_REQUEST });
        const response = await axios.put(`https://devinside-backend-service.onrender.com/unlike/${postId}`, postId, { headers: { authorization: tokenGetter() } });
        dispatch({ type: UPDATE_LIKES_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: UPDATE_LIKES_FAIL, payload: error.response.data });
    }
}

export const deletePostAction = (postId, navigate) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_POST_REQUEST });
        await axios.delete(`https://devinside-backend-service.onrender.com/post/delete/${postId}`, { headers: { authorization: tokenGetter() } });
        dispatch({ type: DELETE_POST_SUCCESS, payload: postId });
        navigate("/");
    } catch (error) {
        dispatch({ type: DELETE_POST_FAIL, payload: error.response.data });
    }
}

export const addCommentAction = (postId, formData, resetCommentHandler) => async (dispatch) => {
    try {
        dispatch({ type: ADD_COMMENT_REQUEST });
        const response = await axios.post(`https://devinside-backend-service.onrender.com/comment/new/${postId}`, formData, { headers: { authorization: tokenGetter() } });
        dispatch({ type: ADD_COMMENT_SUCCESS, payload: response.data });
        resetCommentHandler();
    } catch (error) {
        dispatch({ type: ADD_COMMENT_FAIL, payload: error.response.data });
    }
}

export const deleteCommentAction = (postId, commentId) => async (dispatch) => {
    try {
        dispatch({ type: REMOVE_COMMENT_REQUEST });
        await axios.delete(`https://devinside-backend-service.onrender.com/comment/delete/${postId}/${commentId}`, { headers: { authorization: tokenGetter() } });
        dispatch({ type: REMOVE_COMMENT_SUCCESS, payload: commentId });
    } catch (error) {
        dispatch({ type: REMOVE_COMMENT_FAIL, payload: error.response.data });
    }
}