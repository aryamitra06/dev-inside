import axios from "axios";
import { tokenGetter } from "../../utils/tokenIdGetter";
import { MY_PROFILE_REQUEST, MY_PROFILE_SUCCESS, MY_PROFILE_FAIL } from "../constants/types";

export const myProfileAction = () => async (dispatch) => {
    try {
        dispatch({ type: MY_PROFILE_REQUEST });
        const response = await axios.get("http://localhost:5000/me",  { headers: { authorization: tokenGetter()} });
        dispatch({ type: MY_PROFILE_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: MY_PROFILE_FAIL, payload: error.response.data });
    }
}