import { combineReducers } from "redux";
import { logInReducer, signUpReducer } from "./authReducer";
import { postReducer } from "./postReducer";
import { profileReducer } from "./profileReducer";
export const rootReducer = combineReducers({
    //auth reducer
    signup: signUpReducer,
    login: logInReducer,

    //post reducer
    postReducer: postReducer,

    //profile reducer
    profileReducer: profileReducer
});