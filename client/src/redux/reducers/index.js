import { combineReducers } from "redux";
import { logInReducer, signUpReducer } from "./authReducer";
import { allPostsReducer } from "./postReducer";
import { addEduReducer, addExpReducer, createProfileReducer, deleteEduReducer, deleteExpReducer, editProfileReducer, myProfileReducer, profileByIdReducer } from "./profileReducer";
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
    deleteedu: deleteEduReducer,
    profilebyid: profileByIdReducer,
    togglevalue: toggleReducer,
    allposts: allPostsReducer
});