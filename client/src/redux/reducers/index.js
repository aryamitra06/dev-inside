import { combineReducers } from "redux";
import { signUpReducer } from "./authReducer";
export const rootReducer = combineReducers({
    signup: signUpReducer
});