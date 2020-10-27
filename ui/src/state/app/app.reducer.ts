import { Action } from "../../interfaces/store.interface";
import { AppActionTypes } from "./app.actions";
import AppState, { initialAppState } from "./app.state";

export const appReducer = (
    state: AppState = initialAppState,
    action: Action
): AppState => {
    switch(action.type) {
        case AppActionTypes.ChangeAvatar:
            return {
                ...state,
                user: {
                    ...state.user,
                    avatarUrl: action.payload
                }
            };

            default:
                return state;
    }
}