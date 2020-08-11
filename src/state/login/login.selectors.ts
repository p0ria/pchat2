import { RootState } from './../../interfaces/store.interface';
import { createSelector } from 'reselect';

export const selectLoginState = (state: RootState) => state.login;

export const selectEmailAddress = createSelector(
  selectLoginState,
  state => state.emailAddress
);

export const selectUiState = createSelector(
  selectLoginState,
  state => state.uiState
);

export const selectLoginError = createSelector(
  selectLoginState,
  state => state.error
);