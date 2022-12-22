import { combineReducers } from "redux";
import { logInReducer, signUpReducer } from "./authReducer";
import { postReducer } from "./postReducer";
import { addEduReducer, addExpReducer, deleteEduReducer, deleteExpReducer, profileByIdReducer, profileReducer } from "./profileReducer";
export const rootReducer = combineReducers({
    //auth reducer
    signup: signUpReducer,
    login: logInReducer,

    //post reducer
    postReducer: postReducer,

    //profile reducer
    profileReducer: profileReducer, //main and only one profile reducer

    addexp: addExpReducer,
    addedu: addEduReducer,
    deleteexp: deleteExpReducer,
    deleteedu: deleteEduReducer
});