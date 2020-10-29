import { Action } from "../../interfaces/store.interface";
import { AppActionTypes } from "./app.actions";
import AppState, { initialAppState } from "./app.state";

export const appReducer = (
    state: AppState = initialAppState,
    action: Action
): AppState => {
    switch (action.type) {
        case AppActionTypes.SubscribeToWSFail:
            console.log(action.payload);
            return state;

        case AppActionTypes.ChangeAvatarSuccess:
            return {
                ...state,
                user: {
                    ...state.user,
                    avatarUrl: action.payload
                }
            };

        case AppActionTypes.ChangeAvatarFail:
            console.log(action.payload);
            return state;

        default:
            return state;
    }
}