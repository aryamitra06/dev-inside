import { SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAIL, LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAIL, RESET_STATE } from "../constants/types";

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
            localStorage.setItem('token', action.payload.token);
            return { response: action.payload, loading: false, error: false };
        case SIGN_UP_FAIL:
            localStorage.removeItem('token');
            return { response: null, loading: false, error: action.payload }
        case RESET_STATE:
            return initialState;
        default:
            return state;
    }
}

export const logInReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOG_IN_REQUEST:
            return { response: null, loading: true, error: false };
        case LOG_IN_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return { response: action.payload, loading: false, error: false };
        case LOG_IN_FAIL:
            localStorage.removeItem('token');
            return { response: null, loading: false, error: action.payload }
        case RESET_STATE:
            return initialState;
        default:
            return state;
    }
}