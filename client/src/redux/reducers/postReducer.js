import { ALL_POSTS_FAIL, ALL_POSTS_REQUEST, ALL_POSTS_SUCCESS, DELETE_EDU_SUCCESS, DELETE_POST_FAIL, DELETE_POST_REQUEST, DELETE_POST_SUCCESS, NEW_POST_FAIL, NEW_POST_REQUEST, NEW_POST_SUCCESS, POST_BY_ID_FAIL, POST_BY_ID_REQUEST, POST_BY_ID_SUCCESS, UPDATE_LIKES_FAIL, UPDATE_LIKES_REQUEST, UPDATE_LIKES_SUCCESS } from "../constants/types";

const initialState = {
    posts: [],
    post: {},
    postsLoading: true,
    postLoading: true,
    error: null,
    isFormSubmitting: false,
    isLikeUpdating: false,
    isPostDeleting: false
}

export const postReducer = (state = initialState, action) => {
    switch (action.type) {
        //@desc
        //when it is request we dont need to call loading = true, posts data is already in state.
        case ALL_POSTS_REQUEST:
            return { ...state }
        case ALL_POSTS_SUCCESS:
            return { ...state, posts: action.payload, postsLoading: false };
        case ALL_POSTS_FAIL:
            return { ...state, posts: null, postsLoading: false, error: action.payload };

        //@desc
        //each time we click on a post we will show user loading first until data arrives! 
        case POST_BY_ID_REQUEST:
            return { ...state, post: {}, postLoading: true };
        case POST_BY_ID_SUCCESS:
            return { ...state, post: action.payload, postLoading: false };
        case POST_BY_ID_FAIL:
            return { ...state, post: {}, postLoading: false, error: action.payload };

        //@desc
        //isFormSubmitting state will not be false until we get response back from post form api!
        case NEW_POST_REQUEST:
            return { ...state, isFormSubmitting: true };
        case NEW_POST_SUCCESS:
            return { ...state, posts: [action.payload, ...state.posts], isFormSubmitting: false };
        case NEW_POST_FAIL:
            return { ...state, error: action.payload, isFormSubmitting: false };

        //@desc
        //update likes for the post state with UPDATED_LIKES payload
        case UPDATE_LIKES_REQUEST:
            return {...state, isLikeUpdating: true};
        case UPDATE_LIKES_SUCCESS:
            return { ...state, posts: state.posts.map(post => post._id === action.payload._id ? { ...post, likes: action.payload.likes } : post), isLikeUpdating: false };
        case UPDATE_LIKES_FAIL:
            return {...state, error: action.payload, isLikeUpdating: false};

        //@desc
        //delete post by id
        case DELETE_POST_REQUEST:
            return {...state, isPostDeleting: true};
        case DELETE_POST_SUCCESS:
            return {...state, posts: state.posts.filter(post => post._id !== action.payload), isPostDeleting: false};
        case DELETE_POST_FAIL:
            return {...state, error: action.payload, isPostDeleting: false};
        default:
            return state;
    }
}
