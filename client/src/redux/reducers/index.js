import { combineReducers } from "redux";
import { logInReducer, signUpReducer } from "./authReducer";
import { addEduReducer, addExpReducer, createProfileReducer, deleteExpReducer, editProfileReducer, myProfileReducer } from "./profileReducer";
import { userReducer } from "./userReducer";
import { toggleReducer } from "./utilsReducer";
export const rootReducer = combineReducers({
    signup: signUpReducer,
    login: logInReducer,
    user: userReducer,
    getprofile: myProfileReducer,
    createprofile: createProfileReducer,
    editprofile: editProfileReducer,
    addexp: addExpReducer,
    addedu: addEduReducer,
    deleteexp: deleteExpReducer,
    togglevalue: toggleReducer
});