import { USER_REQUEST, USER_SUCCESS, USER_FAIL } from "../constants/types";

const initialState = {
    response: {},
    loading: true,
    error: false,
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_REQUEST:
            return { response: {}, loading: true, error: false };
        case USER_SUCCESS:
            return { response: action.payload, loading: false, error: false };
        case USER_FAIL:
            return { response: {}, loading: false, error: action.payload }
        default:
            return state;
    }
}