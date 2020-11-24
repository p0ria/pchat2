import { call, getContext, put, select, takeEvery } from "redux-saga/effects";
import { ADD_MESSAGE_MUTATION } from "../../graphql/mutations";
import { AUDIENCE_QUERY, AUDIENEC_IMPL_QUERY } from "../../graphql/queries";
import { Action } from "../../interfaces/store.interface";
import { selectToken } from "../login/login.selectors";
import { actionActivateChatDrawerSuccess, actionGetSelectedAudienceImpl, actionGetSelectedAudienceImplFail, actionGetSelectedAudienceImplSuccess, actionRemoveChatDrawer, actionRemoveChatDrawerSuccess, actionSelectAudienceSuccess, actionSubmitChatDrawerFail, actionSubmitChatDrawerSuccess, ChatActionTypes } from "./chat.actions";
import { selectActiveDrawer, selectSelectedAudience } from "./chat.selectors";

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
        audience.messages.forEach(m => m.value = JSON.parse(m.value));
        yield put(actionSelectAudienceSuccess(audience));
    } catch (error) {
        console.log(error);
    }
}

export function* getSelectedAudienceImplSaga(action: Action) {
    try {
        const audience = yield select(selectSelectedAudience);
        if (audience) {
            const token = yield select(selectToken);
            const client = yield getContext('client');
            client.setHeader('authorization', token);
            const variables = {
                audienceId: audience._id
            }
            const { audienceImpl } = yield call(client.request.bind(client), AUDIENEC_IMPL_QUERY, variables);
            if (audienceImpl) {
                yield put(actionGetSelectedAudienceImplSuccess(audienceImpl));
            } else {
                yield put(actionGetSelectedAudienceImplFail(`The corresponding AudienceImpl of Audience ${audience._id} not found`));
            }
        } else {
            yield put(actionGetSelectedAudienceImplFail("Can't get the AudienceImpl of null"));
        }
    } catch (error) {
        console.log(error);
    }
}

export function* activateChatDrawerSaga(action: Action) {
    try {
        const activeDrawer = yield select(selectActiveDrawer);
        if (activeDrawer && activeDrawer.drawer !== action.payload.drawerRef) {
            yield put(actionRemoveChatDrawer());
        }
        yield put(
            actionActivateChatDrawerSuccess(action.payload.drawerRef, action.payload.children))
    } catch (error) {

    }
}

export function* removeChatDrawerSaga(action: Action) {
    try {
        const activeDrawer = yield select(selectActiveDrawer);
        if (activeDrawer && activeDrawer.drawer.current && activeDrawer.drawer.current.clear) {
            activeDrawer.drawer.current.clear();
        }
        yield put(actionRemoveChatDrawerSuccess());
    } catch (error) {

    }
}

export function* submitChatDrawerSaga(action: Action) {
    try {
        const audience = yield select(selectSelectedAudience);
        const activeDrawer = yield select(selectActiveDrawer);
        if (audience && activeDrawer && activeDrawer.drawer.current && activeDrawer.drawer.current.submit) {
            yield call(activeDrawer.drawer.current.submit, audience._id);
            yield put(actionSubmitChatDrawerSuccess());
            yield put(actionRemoveChatDrawer());
        }
    } catch (error) {
        yield put(actionSubmitChatDrawerFail(error));
    }
}

export const chatSagas = [
    takeEvery(ChatActionTypes.SendMessage, sendMessageSaga),
    takeEvery(ChatActionTypes.SelectAudience, getAudienceSaga),
    takeEvery(ChatActionTypes.GetSelectedAudienceImpl, getSelectedAudienceImplSaga),
    takeEvery(ChatActionTypes.ActivateChatDrawer, activateChatDrawerSaga),
    takeEvery(ChatActionTypes.RemoveChatDrawer, removeChatDrawerSaga),
    takeEvery(ChatActionTypes.SubmitChatDrawer, submitChatDrawerSaga)
];