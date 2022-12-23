import { MY_PROFILE_REQUEST, MY_PROFILE_SUCCESS, MY_PROFILE_FAIL, CREATE_PROFILE_REQUEST, CREATE_PROFILE_SUCCESS, CREATE_PROFILE_FAIL, EDIT_PROFILE_REQUEST, EDIT_PROFILE_SUCCESS, EDIT_PROFILE_FAIL, ADD_EXP_REQUEST, ADD_EXP_SUCCESS, ADD_EXP_FAIL, ADD_EDU_REQUEST, ADD_EDU_SUCCESS, ADD_EDU_FAIL, DELETE_EXP_REQUEST, DELETE_EXP_SUCCESS, DELETE_EXP_FAIL, DELETE_EDU_REQUEST, DELETE_EDU_SUCCESS, DELETE_EDU_FAIL, PROFILE_BY_ID_REQUEST, PROFILE_BY_ID_SUCCESS, PROFILE_BY_ID_FAIL, ALL_PROFILES_REQUEST, ALL_PROFILES_SUCCESS, ALL_PROFILES_FAIL } from "../constants/types";

const initialState = {
    profile: {},
    profileLoading: true,

    profiles: [],
    profilesLoading: true,

    profileById: {},
    profileByIdLoading: true,

    isFormSubmitting: false,
    isDeleting: false,
    navigateOnSuccess: false
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
            return { ...state, error: payload, profileLoading: false }
        //@desc
        //creating a new profile
        case CREATE_PROFILE_REQUEST:
            return { ...state, isFormSubmitting: true, navigateOnSuccess: false };
        case CREATE_PROFILE_SUCCESS:
            return { ...state, profile: { ...state.profile, ...payload }, isFormSubmitting: false, navigateOnSuccess: true };
        case CREATE_PROFILE_FAIL:
            return { ...state, profile: null, error: payload, isFormSubmitting: false, navigateOnSuccess: false };
        default:
            return state;
        //@profile by id
        case PROFILE_BY_ID_REQUEST:
            return { ...state, profileByIdLoading: true };
        case PROFILE_BY_ID_SUCCESS:
            return { ...state, profileById: payload, profileByIdLoading: false };
        case PROFILE_BY_ID_FAIL:
            return { ...state, error: payload, profileByIdLoading: false };
        //@desc
        //edit profile
        case EDIT_PROFILE_REQUEST:
            return { ...state, isFormSubmitting: true };
        case EDIT_PROFILE_SUCCESS:
            return { ...state, profile: { ...state.profile, ...payload }, isFormSubmitting: false };
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
        //@desc
        //add experience
        case ADD_EXP_REQUEST:
            return { ...state, isFormSubmitting: true };
        case ADD_EXP_SUCCESS:
            return { ...state, profile: { ...state.profile, experience: payload.experience }, isFormSubmitting: false };
        case ADD_EXP_FAIL:
            return { ...state, isFormSubmitting: false, error: payload };
        //@desc
        //delete experience
        case DELETE_EXP_REQUEST:
            return { ...state, isDeleting: true };
        case DELETE_EXP_SUCCESS:
            return { ...state, profile: { ...state.profile, experience: state.profile.experience.filter((experience) => experience._id !== payload) }, isDeleting: false };
        case DELETE_EXP_FAIL:
            return { ...state, isDeleting: false, error: payload }
        //@desc
        //add education
        case ADD_EDU_REQUEST:
            return { ...state, isFormSubmitting: true };
        case ADD_EDU_SUCCESS:
            return { ...state, profile: { ...state.profile, education: payload.education }, isFormSubmitting: false };
        case ADD_EDU_FAIL:
            return { ...state, isFormSubmitting: false, error: payload };
        //@desc
        //delete experience
        case DELETE_EDU_REQUEST:
            return { ...state, isDeleting: true };
        case DELETE_EDU_SUCCESS:
            return { ...state, profile: { ...state.profile, education: state.profile.education.filter((education) => education._id !== payload) }, isDeleting: false };
        case DELETE_EDU_FAIL:
            return { ...state, isDeleting: false, error: payload }
    }
}