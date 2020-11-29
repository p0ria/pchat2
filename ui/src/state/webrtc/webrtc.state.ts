import { Audience } from "../../interfaces/audience.interface";

interface WebrtcState {
    callee: Audience | null
    localStream: MediaStream | null
    localConnection: RTCPeerConnection | null
    remoteStream?: MediaStream
}

export const initialWebrtcState: WebrtcState = {
    callee: null,
    localStream: null,
    localConnection: null,
    remoteStream: null
}

export default WebrtcState;