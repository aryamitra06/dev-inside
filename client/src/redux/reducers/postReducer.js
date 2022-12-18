import { ALL_POSTS_FAIL, ALL_POSTS_REQUEST, ALL_POSTS_SUCCESS, NEW_POST_FAIL, NEW_POST_REQUEST, NEW_POST_SUCCESS, POST_BY_ID_FAIL, POST_BY_ID_REQUEST, POST_BY_ID_SUCCESS } from "../constants/types";

const initialState = {
    posts: [],
    post: {},
    loading: true,
    error: null,
    isFormSubmitting: false
}

export const postReducer = (state = initialState, action) => { 
    switch (action.type) {
        //@desc
        //when it is request we dont need to call loading = true, posts data is already in state.
        case ALL_POSTS_SUCCESS:
            return { ...state, posts: action.payload, loading: false };
        case ALL_POSTS_FAIL:
            return { ...state, posts: null, loading: false, error: action.payload };
        
        //@desc
        //each time we click on a post we will show user loading first until data arrives! 
        case POST_BY_ID_REQUEST:
            return {...state, post: {}, loading: true};
        case POST_BY_ID_SUCCESS:
            return { ...state, post: action.payload, loading: false };
        case POST_BY_ID_FAIL:
            return { ...state, post: {}, loading: false, error: action.payload };
        
        //@desc
        //isFormSubmitting state will not be false until we get response back from post form api!
        case NEW_POST_REQUEST:
            return {...state, isFormSubmitting: true};
        case NEW_POST_SUCCESS:
            return {...state, posts: [action.payload, ...state.posts], isFormSubmitting: false};
        case NEW_POST_FAIL:
            return {...state, error: action.payload, isFormSubmitting: false};
        default:
            return state;
    }
}
