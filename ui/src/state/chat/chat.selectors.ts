import { createSelector } from "reselect";
import { RootState } from "../../interfaces/store.interface";

export const selectChatState = (state: RootState) => state.chat;

export const selectSelectedAudience = createSelector(
    selectChatState,
    state => state.selectedAudience
)

export const selectSelectedAudienceMessages = createSelector(
    selectSelectedAudience,
    audience => (audience && audience.messages) || []
)