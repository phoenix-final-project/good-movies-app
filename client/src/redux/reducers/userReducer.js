import { ActionTypes } from "../constants/action-types";

const initialState = {
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    token: "",
};

export const userReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.REGISTER_USER:
            return state;
        case ActionTypes.LOGIN_USER:
            console.log("login", payload.user);
            state.username = payload.user.username;
            state.firstname = payload.user.firstname;
            state.lastname = payload.user.lastname;
            state.email = payload.user.email;
            state.token = payload.token;
            return state;
        case ActionTypes.LOGOUT_USER:
            return state;
        default:
            return state;
    }
};
