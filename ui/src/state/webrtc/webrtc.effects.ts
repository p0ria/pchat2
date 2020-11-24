import { call, put, select, takeEvery } from "redux-saga/effects";
import { Action } from "../../interfaces/store.interface";
import { sendToWebrtcSocket } from "../../services/webrtc";
import { getPeerConnection, getUserMedia } from "../../Utils/media-utils";
import { selectUser } from "../app/app.selectors";
import { selectSelectedAudience, selectSelectedAudienceImpl } from "../chat/chat.selectors";
import { actionCallAudienceFail, actionCallAudienceSuccess, actionSendWebrtcMessage, WebrtcActionTypes } from "./webrtc.actions";

export function* callAudienceSaga(action: Action) {
    try {
        const dispatch = action.payload;
        const localStream = yield call(getUserMedia, { audio: false, video: true });
        const localConnection = getPeerConnection();
        localConnection.onicecandidate = ({ candidate }) => {
            dispatch(actionSendWebrtcMessage({
                type: 'candidate',
                payload: candidate
            }))
        };
        localStream.getTracks().forEach(track => {
            localConnection.addTrack(track, localStream);
        });
        (<any>localConnection).createOffer(
            desc => {
                localConnection.setLocalDescription(desc);
                dispatch(actionSendWebrtcMessage({
                    type: 'offer',
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

export const webrtcSagas = [
    takeEvery(WebrtcActionTypes.CallAudience, callAudienceSaga),
    takeEvery(WebrtcActionTypes.SendWebrtcMessage, sendWebrtcMessageSaga)
];