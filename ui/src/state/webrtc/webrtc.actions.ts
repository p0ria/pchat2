import { Audience } from "../../interfaces/audience.interface"

export const WebrtcActionTypes = {
    CallAudience: '[WEBRTC] Call Audience',
    CallAudienceFail: '[WEBRTC] Call Audience Fail',
    CallAudienceSuccess: '[WEBRTC] Call Audience Success',
    SendWebrtcMessage: '[WEBRTC] Send Webrtc Message',
    OnCandidateMessage: '[WEBRTC] On Candidate Message',
    OnOfferMessage: '[WEBRTC] On Offer Message',
    OnAnswerMessage: '[WEBRTC] On Answer Message',
    OnRemoteStreamAdded: '[WEBRTC] On Remote Stream Added'
}

export const actionCallAudience = dispatch => ({
    type: WebrtcActionTypes.CallAudience,
    payload: dispatch
})

export const actionCallAudienceSuccess = (localStream: MediaStream, localConnection: RTCPeerConnection) => ({
    type: WebrtcActionTypes.CallAudienceSuccess,
    payload: { localStream, localConnection }
})

export const actionCallAudienceFail = error => ({
    type: WebrtcActionTypes.CallAudienceFail,
    payload: error
})

export const actionSendWebrtcMessage = message => ({
    type: WebrtcActionTypes.SendWebrtcMessage,
    payload: message
})

export const actionOnCandidateMessage = (candidate, dispatch) => ({
    type: WebrtcActionTypes.OnCandidateMessage,
    payload: { candidate, dispatch }
})

export const actionOnOfferMessage = (offer, dispatch) => ({
    type: WebrtcActionTypes.OnOfferMessage,
    payload: { offer, dispatch }
})

export const actionOnAnswerMessage = (answer, dispatch) => ({
    type: WebrtcActionTypes.OnAnswerMessage,
    payload: { answer, dispatch }
})

export const actionOnRemoteStreamAdded = stream => ({
    type: WebrtcActionTypes.OnRemoteStreamAdded,
    payload: stream
})