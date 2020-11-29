import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { getUserMedia, getPeerConnection } from "../Utils/media-utils";
import { actionSendWebrtcMessage } from "../state/webrtc/webrtc.actions.ts";
import { off } from "process";

export default (calleeId) => {
    const [localStream, setLocalStream] = useState();
    const [remoteStream, setRemoteStream] = useState();
    const [error, setError] = useState();
    const dispatch = useDispatch();

    const call = async () => {
        try {
            const localStream = await getUserMedia({ audio: false, video: true });
            const localConnection = getPeerConnection();
            localConnection.addStream(localStream);
            localConnection.onAddStream = e => {
                setRemoteStream(e.stream);
            }
            localConnection.onicecandidate = e => {
                if (e.candidate) {
                    dispatch(actionSendWebrtcMessage({
                        type: 'candidate',
                        payload: e.candidate
                    }))
                }
            }
            localConnection.createOffer(offer => {
                localConnection.setLocalDescription(offer);
                dispatch(actionSendWebrtcMessage({
                    type: 'offer',
                    payload: offer
                }))
            }, err => {
                setError(err);
            });
            setLocalStream(localStream);
        } catch (err) {
            setError(err);
        }
    }
    useEffect(() => {
    }, [])
    return [localStream, remoteStream, error];
}