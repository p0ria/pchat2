import { call, getContext, select, takeEvery } from "redux-saga/effects";
import { ADD_MESSAGE_MUTATION } from "../../graphql/mutations";
import { Action } from "../../interfaces/store.interface";
import { selectToken } from "../login/login.selectors";
import { ChatActionTypes } from "./chat.actions";

export function* sendMessageSaga(action: Action) {
    try {
        const token = yield select(selectToken);
        const client = yield getContext('client');
        client.setHeader('authorization', token);
        const { addMessage } = yield call(client.request.bind(client), ADD_MESSAGE_MUTATION, action.payload);
        console.log(atob(addMessage.value));
    } catch (error) {

    }
}

export const chatSagas = [
    takeEvery(ChatActionTypes.SendMessage, sendMessageSaga)
];