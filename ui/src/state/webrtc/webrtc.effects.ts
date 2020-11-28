import { selectLocalStream, selectLocalConnection } from './webrtc.selectors';
import { WebrtcMessageTypes } from './../../interfaces/webrtc.interface';
import { call, put, select, takeEvery } from "redux-saga/effects";
import { Action } from "../../interfaces/store.interface";
import { sendToWebrtcSocket } from "../../services/webrtc";
import { getPeerConnection, getUserMedia } from "../../Utils/media-utils";
import { selectUser } from "../app/app.selectors";
import { selectSelectedAudienceImpl } from "../chat/chat.selectors";
import { actionCallAudienceFail, actionCallAudienceSuccess, actionOnRemoteStreamAdded, actionSendWebrtcMessage, WebrtcActionTypes } from "./webrtc.actions";

export function* callAudienceSaga(action: Action) {
    try {
        const dispatch = action.payload;
        const { localStream, localConnection } = yield call(createRtcPeerConnection, dispatch);
        (<any>localConnection).createOffer(
            desc => {
                localConnection.setLocalDescription(desc); localConnection.createAnswer()
                dispatch(actionSendWebrtcMessage({
                    type: WebrtcMessageTypes.offer,
                    payload: desc
                }));
                dispatch(actionCallAudienceSuccess(localStream, localConnection));
            },
            error => {
                console.error('Error in creating offer', error);
                dispatch(actionCallAudienceFail(error));
            }
        )
    } catch (error) {
        console.log(error);
        yield put(actionCallAudienceFail(error));
    }
}

export function* sendWebrtcMessageSaga(action: Action) {
    try {
        const user = yield select(selectUser);
        const audienceImpl = yield select(selectSelectedAudienceImpl);
        if (audienceImpl) {
            sendToWebrtcSocket('webrtc',
                {
                    calleeId: user._id == audienceImpl.user1._id ?
                        audienceImpl.user2._id : audienceImpl.user1._id,
                    payload: action.payload
                });
        }
    } catch (error) {

    }
}

export function* onCandidateMessageSaga(action: Action) {
    try {
        const dispatch = action.payload.dispatch;
        let localConnection = yield select(selectLocalConnection);
        if (localConnection == null) {
            const rtcPeerConnection = yield call(createRtcPeerConnection, dispatch);
            localConnection = rtcPeerConnection.localConnection;
            dispatch(actionCallAudienceSuccess(rtcPeerConnection.localStream, localConnection));
        }
        if (action.payload.candidate) {

            localConnection.addIceCandidate(action.payload.candidate);
        }
    } catch (error) {

    }
}

export function* onOfferMessageSaga(action: Action) {
    try {
        const dispatch = action.payload.dispatch;
        let localConnection = yield select(selectLocalConnection);
        if (localConnection == null) {
            const rtcPeerConnection = yield call(createRtcPeerConnection, dispatch);
            localConnection = rtcPeerConnection.localConnection;
            dispatch(actionCallAudienceSuccess(rtcPeerConnection.localStream, localConnection));
        }
        const answer = yield call(localConnection.createAnswer);
        dispatch(actionSendWebrtcMessage({
            type: WebrtcMessageTypes.answer,
            payload: answer
        }))
    } catch (error) {

    }
}

export function* onAnswerMessageSaga(action: Action) {
    try {
        const dispatch = action.payload.dispatch;
        let localConnection = yield select(selectLocalConnection);
        if (localConnection == null) {
            const rtcPeerConnection = yield call(createRtcPeerConnection, dispatch);
            localConnection = rtcPeerConnection.localConnection;
            dispatch(actionCallAudienceSuccess(rtcPeerConnection.localStream, localConnection));
        }
        localConnection.setRemoteDescription(action.payload.answer);
    } catch (error) {

    }
}

export const webrtcSagas = [
    takeEvery(WebrtcActionTypes.CallAudience, callAudienceSaga),
    takeEvery(WebrtcActionTypes.SendWebrtcMessage, sendWebrtcMessageSaga),
    takeEvery(WebrtcActionTypes.OnCandidateMessage, onCandidateMessageSaga),
    takeEvery(WebrtcActionTypes.OnOfferMessage, onOfferMessageSaga),
    takeEvery(WebrtcActionTypes.OnAnswerMessage, onAnswerMessageSaga)
];

async function createRtcPeerConnection(dispatch, options = { audio: false, video: true }) {
    const localStream = await getUserMedia(options);
    const localConnection = getPeerConnection();
    localConnection.onicecandidate = ({ candidate }) => {
        dispatch(actionSendWebrtcMessage({
            type: WebrtcMessageTypes.candidate,
            payload: candidate
        }))
    };
    localConnection.ontrack = event => {
        dispatch(actionOnRemoteStreamAdded(event.streams[0]));
    }
    localStream.getTracks().forEach(track => {
        localConnection.addTrack(track, localStream);
    });
    return { localStream, localConnection };
}