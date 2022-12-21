import { combineReducers } from "redux";
import { logInReducer, signUpReducer } from "./authReducer";
import { postReducer } from "./postReducer";
import { addEduReducer, addExpReducer, allProfilesReducer, createProfileReducer, deleteEduReducer, deleteExpReducer, editProfileReducer, myProfileReducer, profileByIdReducer } from "./profileReducer";
import { toggleReducer } from "./utilsReducer";
export const rootReducer = combineReducers({
    signup: signUpReducer,
    login: logInReducer,
    getprofile: myProfileReducer,
    allprofiles: allProfilesReducer,
    createprofile: createProfileReducer,
    editprofile: editProfileReducer,
    addexp: addExpReducer,
    addedu: addEduReducer,
    deleteexp: deleteExpReducer,
    deleteedu: deleteEduReducer,
    profilebyid: profileByIdReducer,
    togglevalue: toggleReducer,
    postReducer: postReducer //main and only one post reducer
    // @TODO: MAKE ONLY ONE PROFILE REDUCER
});