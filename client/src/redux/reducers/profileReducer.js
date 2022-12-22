import { MY_PROFILE_REQUEST, MY_PROFILE_SUCCESS, MY_PROFILE_FAIL, CREATE_PROFILE_REQUEST, CREATE_PROFILE_SUCCESS, CREATE_PROFILE_FAIL, EDIT_PROFILE_REQUEST, EDIT_PROFILE_SUCCESS, EDIT_PROFILE_FAIL, ADD_EXP_REQUEST, ADD_EXP_SUCCESS, ADD_EXP_FAIL, ADD_EDU_REQUEST, ADD_EDU_SUCCESS, ADD_EDU_FAIL, DELETE_EXP_REQUEST, DELETE_EXP_SUCCESS, DELETE_EXP_FAIL, RESET_STATE, DELETE_EDU_REQUEST, DELETE_EDU_SUCCESS, DELETE_EDU_FAIL, PROFILE_BY_ID_REQUEST, PROFILE_BY_ID_SUCCESS, PROFILE_BY_ID_FAIL, ALL_PROFILES_REQUEST, ALL_PROFILES_SUCCESS, ALL_PROFILES_FAIL } from "../constants/types";

const initialState3 = {
    response: {},
    loading: false,
    error: false,
    success: false,
}

export const addExpReducer = (state = initialState3, action) => {
    switch (action.type) {
        case ADD_EXP_REQUEST:
            return { response: {}, loading: true, error: false, success: false };
        case ADD_EXP_SUCCESS:
            return { response: action.payload, loading: false, error: false, success: true };
        case ADD_EXP_FAIL:
            return { response: {}, loading: false, error: action.payload, success: false };
        case RESET_STATE:
            return initialState3;
        default:
            return state;
    }
}

export const addEduReducer = (state = initialState3, action) => {
    switch (action.type) {
        case ADD_EDU_REQUEST:
            return { response: {}, loading: true, error: false, success: false };
        case ADD_EDU_SUCCESS:
            return { response: action.payload, loading: false, error: false, success: true };
        case ADD_EDU_FAIL:
            return { response: {}, loading: false, error: action.payload, success: false };
        case RESET_STATE:
            return initialState3;
        default:
            return state;
    }
}

export const deleteExpReducer = (state = initialState3, action) => {
    switch (action.type) {
        case DELETE_EXP_REQUEST:
            return { response: {}, loading: true, error: false, success: false };
        case DELETE_EXP_SUCCESS:
            return { response: action.payload, loading: false, error: false, success: true };
        case DELETE_EXP_FAIL:
            return { response: {}, loading: false, error: action.payload, success: false };
        case RESET_STATE:
            return initialState3;
        default:
            return state;
    }
}

export const deleteEduReducer = (state = initialState3, action) => {
    switch (action.type) {
        case DELETE_EDU_REQUEST:
            return { response: {}, loading: true, error: false, success: false };
        case DELETE_EDU_SUCCESS:
            return { response: action.payload, loading: false, error: false, success: true };
        case DELETE_EDU_FAIL:
            return { response: {}, loading: false, error: action.payload, success: false };
        case RESET_STATE:
            return initialState3;
        default:
            return state;
    }
}

const initialState = {
    profile: {},
    profiles: [],
    profileById: {},
    profileLoading: true,
    profilesLoading: true,
    profileByIdLoading: true,
    error: null,
    isFormSubmitting: false,
    isDeleting: false
}
export const profileReducer = (state = initialState, action) => {
    const { payload, type } = action;
    switch (type) {
        //@desc
        //when it is request we dont need to call profileLoading = true, profile data is already in state.
        case MY_PROFILE_REQUEST:
            return { ...state };
        case MY_PROFILE_SUCCESS:
            return { ...state, profile: payload, profileLoading: false };
        case MY_PROFILE_FAIL:
            return { ...state, profile: null, error: payload, profileLoading: false }
        //@desc
        //creating a new profile
        case CREATE_PROFILE_REQUEST:
            return { ...state, isFormSubmitting: true };
        case CREATE_PROFILE_SUCCESS:
            return { ...state, profile: { ...state.profile, ...payload }, isFormSubmitting: false };
        case CREATE_PROFILE_FAIL:
            return { ...state, profile: null, error: payload, isFormSubmitting: false };
        default:
            return state;
        //@desc
        //edit profile
        case EDIT_PROFILE_REQUEST:
            return { ...state, isFormSubmitting: true };
        case EDIT_PROFILE_SUCCESS:
            console.log({ ...state.profile, payload });
            return { ...state, profile: { ...state.profile, payload }, isFormSubmitting: false };
        case EDIT_PROFILE_FAIL:
            return { ...state, error: payload, isFormSubmitting: false };
        //@desc
        //all profiles
        case ALL_PROFILES_REQUEST:
            return { ...state };
        case ALL_PROFILES_SUCCESS:
            return { ...state, profiles: payload, profilesLoading: false };
        case ALL_PROFILES_FAIL:
            return { ...state, profiles: [], error: payload, profilesLoading: false };
        //@profile by id
        case PROFILE_BY_ID_REQUEST:
            return {...state, profileByIdLoading: true};
        case PROFILE_BY_ID_SUCCESS:
            return {...state, profileById: payload, profileByIdLoading: false};
        case PROFILE_BY_ID_FAIL:
            return {...state, error: payload, profileByIdLoading: false};
    }
}