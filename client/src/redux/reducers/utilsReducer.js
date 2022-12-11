import {TOGGLE} from "../constants/types";
export const toggleReducer = (initial=[], action) => {
    switch (action.type) {
        case TOGGLE:
            return action.payload;
        default:
            return initial;
    }
}