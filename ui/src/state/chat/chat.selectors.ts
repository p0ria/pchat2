import { createSelector } from "reselect";
import { RootState } from "../../interfaces/store.interface";

export const selectChatState = (state: RootState) => state.chat;

export const selectSelectedAudience = createSelector(
    selectChatState,
    state => state.selectedAudience
)

export const selectSelectedAudienceImpl = createSelector(
    selectChatState,
    state => state.selectedAudienceImpl
)

export const selectSelectedAudienceMessages = createSelector(
    selectSelectedAudience,
    audience => (audience && audience.messages) || []
)

export const selectActiveDrawer = createSelector(
    selectChatState,
    state => state.activeDrawer
)
