import { actionOnOfferMessage, actionOnAnswerMessage } from './../state/webrtc/webrtc.actions';
import { WebrtcMessageTypes } from './../interfaces/webrtc.interface';
import io from "socket.io-client";
import { actionSubscribeToWebrtcWSFail, actionSubscribeToWebrtcWSSuccess } from "../state/app/app.actions";
import { actionOnCandidateMessage, WebrtcActionTypes } from '../state/webrtc/webrtc.actions';

var socket: SocketIOClient.Socket;
export const connectToWebrtcSocket = (userId, dispatch) => {
    socket = io(process.env.REACT_APP_WEBRTC_URL, {
        transports: ['websocket'],
        query: {
            id: userId
        }
    });
    socket.on('connect', () => {
        dispatch(actionSubscribeToWebrtcWSSuccess())
        console.log('connected to webrtc socket');
    })
    socket.on('connect_error', () => {
        console.error(`Error connecting to webrtc socket`);
    })
    socket.on('disconnect', () => {
        dispatch(actionSubscribeToWebrtcWSFail('Disconnected from webrtc socket'))
        console.log('disconnected from webrtc socket');
    })
    socket.on('message', (message: { type: string, payload: any }) => {
        console.log(`message arrived from webrtc socket`, message);
        switch (message.type) {
            case WebrtcMessageTypes.candidate:
                dispatch(actionOnCandidateMessage(message.payload, dispatch));
                break;

            case WebrtcMessageTypes.offer:
                dispatch(actionOnOfferMessage(message.payload, dispatch));
                break;

            case WebrtcMessageTypes.answer:
                dispatch(actionOnAnswerMessage(message.payload, dispatch));
                break;
        }
    })
}

export const sendToWebrtcSocket = (event, payload) => {
    if (socket && socket.connected) {
        socket.emit(event, payload);
    }
}



