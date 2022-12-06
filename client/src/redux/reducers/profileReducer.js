import { MY_PROFILE_REQUEST, MY_PROFILE_SUCCESS, MY_PROFILE_FAIL } from "../constants/types";

const initialState = {
    response: null,
    loading: false,
    error: false,
}

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case MY_PROFILE_REQUEST:
            return { response: null, loading: true, error: false };
        case MY_PROFILE_SUCCESS:
            return { response: action.payload, loading: false, error: false };
        case MY_PROFILE_FAIL:
            return { response: null, loading: false, error: action.payload }
        default:
            return state;
    }
}