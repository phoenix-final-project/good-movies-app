import { ActionTypes } from "../constants/action-types";

export const addFriend = (friend) => {
    return {
        type: ActionTypes.ADD_FRIEND,
        payload: friend,
    };
};

export const removeFriend = (friend) => {
    return {
        type: ActionTypes.REMOVE_FRIEND,
        payload: friend,
    };
};
