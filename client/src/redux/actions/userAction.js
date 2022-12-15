import axios from "axios";
import { tokenGetter } from "../../utils/tokenIdGetter";
import { USER_REQUEST, USER_SUCCESS, USER_FAIL } from "../constants/types";

export const userAction = () => async (dispatch) => {
    try {
        dispatch({ type: USER_REQUEST });
        const response = await axios.get("http://localhost:5000/user",  { headers: { authorization: tokenGetter()} });
        dispatch({ type: USER_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: USER_FAIL, payload: error.response.data })
    }
}