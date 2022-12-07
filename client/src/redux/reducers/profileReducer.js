import { MY_PROFILE_REQUEST, MY_PROFILE_SUCCESS, MY_PROFILE_FAIL, CREATE_PROFILE_REQUEST, CREATE_PROFILE_SUCCESS, CREATE_PROFILE_FAIL } from "../constants/types";

const initialState = {
    response: {},
    loading: true,
    error: false,
}

export const myProfileReducer = (state = initialState, action) => {
    switch (action.type) {
        case MY_PROFILE_REQUEST:
            return { response: {}, loading: true, error: false };
        case MY_PROFILE_SUCCESS:
            return { response: action.payload, loading: false, error: false };
        case MY_PROFILE_FAIL:
            return { response: {}, loading: false, error: action.payload }
        default:
            return state;
    }
}

export const createProfileReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_PROFILE_REQUEST:
            return { response: {}, loading: true, error: false };
        case CREATE_PROFILE_SUCCESS:
            return { response: action.payload, loading: false, error: false };
        case CREATE_PROFILE_FAIL:
            return { response: {}, loading: false, error: action.payload }
        default:
            return state;
    }
}
