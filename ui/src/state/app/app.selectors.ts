import { createSelector } from "reselect";
import { RootState } from "../../interfaces/store.interface";

export const selectAppState = (state: RootState) => state.app;

export const selectUser = createSelector(
    selectAppState,
    state => state.user
);