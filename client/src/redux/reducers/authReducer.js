import { SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAIL } from "../constants/types";

const initialState = {
    response: null,
    loading: false,
    error: false,
}

export const signUpReducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGN_UP_REQUEST:
            return { response: null, loading: true, error: false };
        case SIGN_UP_SUCCESS:
            localStorage.setItem('token', JSON.stringify(action.payload.token));
            return { response: action.payload, loading: false, error: false };
        case SIGN_UP_FAIL:
            return { response: null, loading: false, error: action.payload }
        default:
            return state;
    }
}