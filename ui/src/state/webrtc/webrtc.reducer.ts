import { Action } from "../../interfaces/store.interface";
import { WebrtcActionTypes } from "./webrtc.actions";
import WebrtcState, { initialWebrtcState } from "./webrtc.state";

export const webrtcReducer = (
    state: WebrtcState = initialWebrtcState,
    action: Action
): WebrtcState => {
    switch (action.type) {
        case WebrtcActionTypes.CallAudience:
            return {
                ...state,
                callee: action.payload
            }

        case WebrtcActionTypes.CallAudienceSuccess:
            return {
                ...state,
                localStream: action.payload.localStream,
                localConnection: action.payload.localConnection
            }

        default:
            return state;
    }
}