import axios from "axios";
import { USER_REQUEST, USER_SUCCESS, USER_FAIL } from "../constants/types";

const API = axios.create({ baseURL: 'http://localhost:5000' });



export const userAction = (token) => async (dispatch) => {
    try {
        dispatch({ type: USER_REQUEST });
        const response = await axios.get("http://localhost:5000/user",  { headers: { authorization: token} });
        dispatch({ type: USER_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: USER_FAIL, payload: error.response.data })
    }
}