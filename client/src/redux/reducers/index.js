import { combineReducers } from "redux";
import { logInReducer, signUpReducer } from "./authReducer";
import { profileReducer } from "./profileReducer";
import { userReducer } from "./userReducer";
export const rootReducer = combineReducers({
    signup: signUpReducer,
    login: logInReducer,
    user: userReducer,
    getprofile: profileReducer
});