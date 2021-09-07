import { ActionTypes } from "../constants/action-types";

const initialState = {
    friends: [],
};

export const friendReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.ADD_FRIEND:
            return { ...state, friends: payload };
        case ActionTypes.REMOVE_FRIEND:
            return state;
        default:
            return state;
    }
};
