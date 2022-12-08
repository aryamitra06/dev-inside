import axios from "axios";
import { SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAIL, LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAIL } from "../constants/types";

export const signUpAction = (authData) => async (dispatch) => {
    try {
        dispatch({ type: SIGN_UP_REQUEST });
        const response = await axios.post("http://localhost:5000/register", authData);
        dispatch({ type: SIGN_UP_SUCCESS, payload: response.data });
        setTimeout(() => { window.location.href = "/dashboard" });
    } catch (error) {
        dispatch({ type: SIGN_UP_FAIL, payload: error.response.data })
        setTimeout(() => { window.location.href = "/signup" });
    }
}

export const logInAction = (authData) => async (dispatch) => {
    try {
        dispatch({ type: LOG_IN_REQUEST });
        const response = await axios.post("http://localhost:5000/login", authData);
        dispatch({ type: LOG_IN_SUCCESS, payload: response.data });
        setTimeout(() => { window.location.href = "/dashboard" });
    } catch (error) {
        dispatch({ type: LOG_IN_FAIL, payload: error.response.data })
        setTimeout(() => { window.location.href = "/login" });
    }
}