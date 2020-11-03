import { call, getContext, put, select, takeEvery } from "redux-saga/effects";
import { CHANGE_AVATAR_MUTATION } from "../../graphql/mutations";
import { ME_QUERY } from "../../graphql/queries";
import { Action } from "../../interfaces/store.interface";
import subscribeToWS from "../../services/ws";
import { actionGetAllAudiences } from "../audience/audience.actions";
import { selectToken } from "../login/login.selectors";
import { actionChangeAvatarFail, actionChangeAvatarSuccess, actionGetProfile, actionGetProfileFail, actionGetProfileSuccess, actionSubscribeToWSFail, AppActionTypes } from "./app.actions";

export function* getProfileSaga(action: Action) {
    try {
        const token = yield select(selectToken);
        const client = yield getContext('client');
        client.setHeader('authorization', token);
        const { me } = yield call(client.request.bind(client), ME_QUERY);
        yield put(actionGetProfileSuccess(me));
    } catch (error) {
        yield put(actionGetProfileFail(error));
    }
}

export function* subscribeToWSSaga(action: Action) {
    try {
        const token = yield select(selectToken);
        const dispatch = action.payload;
        subscribeToWS(token, dispatch);
    } catch (error) {
        yield put(actionSubscribeToWSFail(error));
    }
}

export function* appReconnectedSaga() {
    try {
        yield put(actionGetAllAudiences());
    } catch (error) {
        console.log(error);
    }
}

export function* changeAvatarSaga(action: Action) {
    try {
        const token = yield select(selectToken);
        const client = yield getContext('client');
        client.setHeader('authorization', token);
        const variables = {
            avatarUrl: action.payload
        };
        const avatarUrl = yield call(client.request.bind(client), CHANGE_AVATAR_MUTATION, variables);
        yield put(actionChangeAvatarSuccess(avatarUrl));
    } catch (error) {
        yield put(actionChangeAvatarFail(error));
    }
}

export const appSagas = [
    takeEvery(AppActionTypes.SubscribeToWS, subscribeToWSSaga),
    takeEvery(AppActionTypes.AppReconnected, appReconnectedSaga),
    takeEvery(AppActionTypes.ChangeAvatar, changeAvatarSaga),
    takeEvery(AppActionTypes.GetProfile, getProfileSaga)
];