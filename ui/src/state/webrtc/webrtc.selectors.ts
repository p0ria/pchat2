import { createSelector } from 'reselect';
import { RootState } from './../../interfaces/store.interface';
export const selectWebrtcState = (state: RootState) => state.webrtc;

export const selectLocalConnection = createSelector(
    selectWebrtcState,
    state => state.localConnection
)

export const selectLocalStream = createSelector(
    selectWebrtcState,
    state => state.localStream
)

export const selectRemoteStream = createSelector(
    selectWebrtcState,
    state => state.remoteStream
)