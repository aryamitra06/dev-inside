import { ALL_POSTS_FAIL, ALL_POSTS_REQUEST, ALL_POSTS_SUCCESS } from "../constants/types";

const initialState1 = {
    response: {},
    loading: true,
    error: false,
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