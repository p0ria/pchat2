import { createSelector } from "reselect";
import { RootState } from "../../interfaces/store.interface";

export const selectAudienceState = (state: RootState) => state.audience;

export const selectAudiences = createSelector(
    selectAudienceState,
    state => state.audiences
);