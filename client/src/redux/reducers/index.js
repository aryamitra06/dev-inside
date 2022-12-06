import { combineReducers } from "redux";
import { logInReducer, signUpReducer } from "./authReducer";
import { userReducer } from "./userReducer";
export const rootReducer = combineReducers({
    signup: signUpReducer,
    login: logInReducer,
    user: userReducer
});