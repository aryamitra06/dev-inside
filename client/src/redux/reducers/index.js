import { combineReducers } from "redux";
import { logInReducer, signUpReducer } from "./authReducer";
import { postReducer } from "./postReducer";
import { addEduReducer, addExpReducer, createProfileReducer, deleteEduReducer, deleteExpReducer, editProfileReducer, myProfileReducer, profileByIdReducer } from "./profileReducer";
import { toggleReducer } from "./utilsReducer";
export const rootReducer = combineReducers({
    signup: signUpReducer,
    login: logInReducer,
    getprofile: myProfileReducer,
    createprofile: createProfileReducer,
    editprofile: editProfileReducer,
    addexp: addExpReducer,
    addedu: addEduReducer,
    deleteexp: deleteExpReducer,
    deleteedu: deleteEduReducer,
    profilebyid: profileByIdReducer,
    togglevalue: toggleReducer,
    postReducer: postReducer
});