import { Action } from "../../interfaces/store.interface";
import { ChatActionTypes } from "./chat.actions";
import ChatState, { initialChatState } from "./chat.state";

export const chatReducer = (
    state: ChatState = initialChatState,
    action: Action
): ChatState => {
    switch (action.type) {
        default:
            return state;
    }
}