
// user actions --> constance
import { ActionTypes } from "../constants/action-types";

export const loginUser = (user, token) => {
    return {
        type: ActionTypes.LOGIN_USER,
        payload: { user, token }
    };
}; 

export const logoutUser = () => {
    return {
        type: ActionTypes.LOGOUT_USER,
    };
};