import { ALL_POSTS_FAIL, ALL_POSTS_REQUEST, ALL_POSTS_SUCCESS, NEW_POST_FAIL, NEW_POST_REQUEST, NEW_POST_SUCCESS, POST_BY_ID_FAIL, POST_BY_ID_REQUEST, POST_BY_ID_SUCCESS, RESET_STATE } from "../constants/types";

const initialState1 = {
    response: {},
    loading: true,
    error: false,
}

const initialState3 = {
    response: {},
    loading: false,
    error: false,
    success: false,
}

export const allPostsReducer = (state = initialState1, action) => {
    switch (action.type) {
        case ALL_POSTS_REQUEST:
            return { response: {}, loading: true, error: false };
        case ALL_POSTS_SUCCESS:
            return { response: action.payload, loading: false, error: false };
        case ALL_POSTS_FAIL:
            return { response: {}, loading: false, error: action.payload }
        default:
            return state;
    }
}

export const newPostReducer = (state = initialState3, action) => {
    switch (action.type) {
        case NEW_POST_REQUEST:
            return { response: {}, loading: true, error: false, success: false };
        case NEW_POST_SUCCESS:
            return { response: action.payload, loading: false, error: false, success: true };
        case NEW_POST_FAIL:
            return { response: {}, loading: false, error: action.payload, success: false };
        case RESET_STATE:
            return initialState3;
        default:
            return state;
    }
}

export const postByIdReducer = (state = initialState1, action) => {
    switch (action.type) {
        case POST_BY_ID_REQUEST:
            return { response: {}, loading: true, error: false };
        case POST_BY_ID_SUCCESS:
            return { response: action.payload, loading: false, error: false };
        case POST_BY_ID_FAIL:
            return { response: {}, loading: false, error: action.payload }
        default:
            return state;
    }
}
