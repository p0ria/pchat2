import { ApolloClient } from "@apollo/client";
import { call, getContext, put, select, takeEvery } from "redux-saga/effects";
import { ADD_MESSAGE_MUTATION } from "../../graphql/mutations";
import { AUDIENCE_QUERY } from "../../graphql/queries";
import { Action } from "../../interfaces/store.interface";
import { selectToken } from "../login/login.selectors";
import { actionSelectAudienceSuccess, ChatActionTypes } from "./chat.actions";

export function* sendMessageSaga(action: Action) {
    try {
        const token = yield select(selectToken);
        const client = yield getContext('client');
        client.setHeader('authorization', token);
        const { addMessage } = yield call(client.request.bind(client), ADD_MESSAGE_MUTATION, action.payload);
    } catch (error) {

    }
}

export function* getAudienceSaga(action: Action) {
    try {
        const token = yield select(selectToken);
        const client = yield getContext('client');
        client.setHeader('authorization', token);
        const variables = {
            audienceId: action.payload
        }
        const { audience } = yield call(client.request.bind(client), AUDIENCE_QUERY, variables);
        audience.messages.forEach(m => m.value = atob(m.value));
        yield put(actionSelectAudienceSuccess(audience));
    } catch (error) {
        console.log(error);
    }
}

export const chatSagas = [
    takeEvery(ChatActionTypes.SendMessage, sendMessageSaga),
    takeEvery(ChatActionTypes.SelectAudience, getAudienceSaga)
];