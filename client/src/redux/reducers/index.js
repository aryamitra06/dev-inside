import { combineReducers } from "redux";
import { logInReducer, signUpReducer } from "./authReducer";
import { createProfileReducer, editProfileReducer, myProfileReducer } from "./profileReducer";
import { userReducer } from "./userReducer";
export const rootReducer = combineReducers({
    signup: signUpReducer,
    login: logInReducer,
    user: userReducer,
    getprofile: myProfileReducer,
    createprofile: createProfileReducer,
    editprofile: editProfileReducer
});