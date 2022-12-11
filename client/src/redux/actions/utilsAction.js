import { RESET_STATE, TOGGLE } from "../constants/types";

export const toggleAction = (state) => (dispatch) => {
    dispatch({ type: TOGGLE, payload: state });
};
export const stateReseter = () => (dispatch) => {
    dispatch({ type: RESET_STATE });
}