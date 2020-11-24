import { Audience } from "../../interfaces/audience.interface"

export const WebrtcActionTypes = {
    CallAudience: '[WEBRTC] Call Audience',
    CallAudienceFail: '[WEBRTC] Call Audience Fail',
    CallAudienceSuccess: '[WEBRTC] Call Audience Success',
    SendWebrtcMessage: '[WEBRTC] Send Webrtc Message'
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