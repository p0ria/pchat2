import { Audience } from "../../interfaces/audience.interface";

interface WebrtcState {
    callee: Audience | null
    localStream: MediaStream | null
    localConnection: RTCPeerConnection | null
}

export const initialWebrtcState: WebrtcState = {
    callee: null,
    localStream: null,
    localConnection: null
}

export default WebrtcState;