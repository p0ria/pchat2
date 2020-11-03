import { Action } from "../../interfaces/store.interface";
import { ChatActionTypes } from "./chat.actions";
import ChatState, { initialChatState } from "./chat.state";

export const chatReducer = (
    state: ChatState = initialChatState,
    action: Action
): ChatState => {
    switch (action.type) {
        case ChatActionTypes.SelectAudienceSuccess:
            return {
                ...state,
                selectedAudience: action.payload
            };

        case ChatActionTypes.MessageAdded:
            if (state.selectedAudience &&
                String(action.payload.audience._id) === String(state.selectedAudience._id)) {
                return {
                    ...state,
                    selectedAudience: {
                        ...state.selectedAudience,
                        messages: [
                            ...state.selectedAudience.messages,
                            action.payload
                        ]
                    }
                }
            } else {
                return state;
            }

        default:
            return state;
    }
}