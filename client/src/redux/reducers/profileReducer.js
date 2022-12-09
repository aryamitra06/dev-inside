import { MY_PROFILE_REQUEST, MY_PROFILE_SUCCESS, MY_PROFILE_FAIL, CREATE_PROFILE_REQUEST, CREATE_PROFILE_SUCCESS, CREATE_PROFILE_FAIL, EDIT_PROFILE_REQUEST, EDIT_PROFILE_SUCCESS, EDIT_PROFILE_FAIL, ADD_EXP_REQUEST, ADD_EXP_SUCCESS, ADD_EXP_FAIL } from "../constants/types";

const initialState1 = {
    response: {},
    loading: true,
    error: false,
}
const initialState2 = {
    response: {},
    loading: false,
    error: false,
}
const initialState3 = {
    response: {},
    loading: false,
    error: false,
    success: false,
}

export const myProfileReducer = (state = initialState1, action) => {
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

export const createProfileReducer = (state = initialState2, action) => {
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

export const editProfileReducer = (state = initialState2, action) => {
    switch (action.type) {
        case EDIT_PROFILE_REQUEST:
            return { response: {}, loading: true, error: false };
        case EDIT_PROFILE_SUCCESS:
            return { response: action.payload, loading: false, error: false };
        case EDIT_PROFILE_FAIL:
            return { response: {}, loading: false, error: action.payload }
        default:
            return state;
    }
}

export const addExpReducer = (state = initialState3, action) => {
    switch (action.type) {
        case ADD_EXP_REQUEST:
            return { response: {}, loading: true, error: false, success: false };
        case ADD_EXP_SUCCESS:
            return { response: action.payload, loading: false, error: false, success: true };
        case ADD_EXP_FAIL:
            return { response: {}, loading: false, error: action.payload, success: false };
        case "RESET_STATE":
            return { response: {}, loading: false, error: false, success: false };
        default:
            return state;
    }
}