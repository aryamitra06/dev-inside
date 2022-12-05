import axios from "axios";
import { SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAIL } from "../constants/types";

export const signUpAction = (authData) => async (dispatch) => {
    try {
        dispatch({ type: SIGN_UP_REQUEST });
        const response = await axios.post("http://localhost:5000/register", authData);
        dispatch({ type: SIGN_UP_SUCCESS, payload: response.data });
        setTimeout(() => { window.location.href = "/" }, 3000);
    } catch (error) {
        dispatch({ type: SIGN_UP_FAIL, payload: error.response.data })
        setTimeout(() => { window.location.href = "/signup" }, 3000);
    }
}