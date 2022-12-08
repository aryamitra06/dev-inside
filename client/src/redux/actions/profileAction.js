import axios from "axios";
import { tokenGetter } from "../../utils/tokenIdGetter";
import { MY_PROFILE_REQUEST, MY_PROFILE_SUCCESS, MY_PROFILE_FAIL, CREATE_PROFILE_REQUEST, CREATE_PROFILE_SUCCESS, CREATE_PROFILE_FAIL, EDIT_PROFILE_REQUEST, EDIT_PROFILE_SUCCESS, EDIT_PROFILE_FAIL } from "../constants/types";

export const myProfileAction = () => async (dispatch) => {
    try {
        dispatch({ type: MY_PROFILE_REQUEST });
        const response = await axios.get("http://localhost:5000/me", { headers: { authorization: tokenGetter() } });
        dispatch({ type: MY_PROFILE_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: MY_PROFILE_FAIL, payload: error.response.data });
    }
}

export const createProfileAction = (formData) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_PROFILE_REQUEST });
        const response = await axios.post("http://localhost:5000/createprofile", formData, { headers: { authorization: tokenGetter() } });
        dispatch({ type: CREATE_PROFILE_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: CREATE_PROFILE_FAIL, payload: error.response.data });
    }
}

export const editProfileAction = (formData) => async (dispatch) => {
    try {
        dispatch({ type: EDIT_PROFILE_REQUEST });
        const response = await axios.put("http://localhost:5000/editprofile", formData, { headers: { authorization: tokenGetter() } });
        dispatch({ type: EDIT_PROFILE_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: EDIT_PROFILE_FAIL, payload: error.response.data });
    }
}