import axios from "axios";
import { tokenGetter } from "../../utils/tokenExtractor";
import { MY_PROFILE_REQUEST, MY_PROFILE_SUCCESS, MY_PROFILE_FAIL, CREATE_PROFILE_REQUEST, CREATE_PROFILE_SUCCESS, CREATE_PROFILE_FAIL, EDIT_PROFILE_REQUEST, EDIT_PROFILE_SUCCESS, EDIT_PROFILE_FAIL, ADD_EXP_REQUEST, ADD_EXP_SUCCESS, ADD_EXP_FAIL, ADD_EDU_REQUEST, ADD_EDU_SUCCESS, ADD_EDU_FAIL, DELETE_EXP_REQUEST, DELETE_EXP_SUCCESS, DELETE_EXP_FAIL, DELETE_EDU_REQUEST, DELETE_EDU_SUCCESS, DELETE_EDU_FAIL, PROFILE_BY_ID_FAIL, PROFILE_BY_ID_REQUEST, PROFILE_BY_ID_SUCCESS, ALL_PROFILES_REQUEST, ALL_PROFILES_SUCCESS, ALL_PROFILES_FAIL } from "../constants/types";

export const myProfileAction = () => async (dispatch) => {
    try {
        dispatch({ type: MY_PROFILE_REQUEST });
        const response = await axios.get("https://devinside-backend-service.onrender.com/me", { headers: { authorization: tokenGetter() } });
        dispatch({ type: MY_PROFILE_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: MY_PROFILE_FAIL, payload: error.response.data });
    }
}

export const createProfileAction = (formData, navigate) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_PROFILE_REQUEST });
        const response = await axios.post("https://devinside-backend-service.onrender.com/createprofile", formData, { headers: { authorization: tokenGetter() } });
        dispatch({ type: CREATE_PROFILE_SUCCESS, payload: response.data });
        navigate("/dashboard");
    } catch (error) {
        dispatch({ type: CREATE_PROFILE_FAIL, payload: error.response.data });
    }
}

export const editProfileAction = (formData) => async (dispatch) => {
    try {
        dispatch({ type: EDIT_PROFILE_REQUEST });
        const response = await axios.put("https://devinside-backend-service.onrender.com/editprofile", formData, { headers: { authorization: tokenGetter() } });
        dispatch({ type: EDIT_PROFILE_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: EDIT_PROFILE_FAIL, payload: error.response.data });
    }
}

export const addExpAction = (formData, navigate) => async (dispatch) => {
    try {
        dispatch({ type: ADD_EXP_REQUEST });
        const response = await axios.put("https://devinside-backend-service.onrender.com/addexperience", formData, { headers: { authorization: tokenGetter() } });
        dispatch({ type: ADD_EXP_SUCCESS, payload: response.data });
        navigate("/dashboard");
    } catch (error) {
        dispatch({ type: ADD_EXP_FAIL, payload: error.response.data });
    }
}

export const addEduAction = (formData, navigate) => async (dispatch) => {
    try {
        dispatch({ type: ADD_EDU_REQUEST });
        const response = await axios.put("https://devinside-backend-service.onrender.com/addeducation", formData, { headers: { authorization: tokenGetter() } });
        dispatch({ type: ADD_EDU_SUCCESS, payload: response.data });
        navigate("/dashboard");
    } catch (error) {
        dispatch({ type: ADD_EDU_FAIL, payload: error.response.data });
    }
}

export const deleteExpAction = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_EXP_REQUEST });
        await axios.delete(`https://devinside-backend-service.onrender.com/deleteexperience/${id}`, { headers: { authorization: tokenGetter() } });
        dispatch({ type: DELETE_EXP_SUCCESS, payload: id });
    } catch (error) {
        dispatch({ type: DELETE_EXP_FAIL, payload: error.response.data });
    }
}

export const deleteEduAction = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_EDU_REQUEST });
        await axios.delete(`https://devinside-backend-service.onrender.com/deleteeducation/${id}`, { headers: { authorization: tokenGetter() } });
        dispatch({ type: DELETE_EDU_SUCCESS, payload: id });
    } catch (error) {
        dispatch({ type: DELETE_EDU_FAIL, payload: error.response.data });
    }
}

export const profileByIdAction = (id) => async (dispatch) => {
    try {
        dispatch({ type: PROFILE_BY_ID_REQUEST });
        const response = await axios.get(`https://devinside-backend-service.onrender.com/profile/${id}`);
        dispatch({ type: PROFILE_BY_ID_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: PROFILE_BY_ID_FAIL, payload: error.response.data });
    }
}

export const allProfilesAction = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_PROFILES_REQUEST });
        const response = await axios.get("https://devinside-backend-service.onrender.com/allprofiles");
        dispatch({ type: ALL_PROFILES_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: ALL_PROFILES_FAIL, payload: error.response.data })
    }
}