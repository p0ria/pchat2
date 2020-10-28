import { call, getContext, put, select, takeEvery } from "redux-saga/effects";
import { CHANGE_AVATAR_MUTATION } from "../../graphql/mutations";
import { Action } from "../../interfaces/store.interface";
import { actionGetAllAudiences } from "../audience/audience.actions";
import { selectToken } from "../login/login.selectors";
import { actionChangeAvatarSuccess, AppActionTypes } from "./app.actions";

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
        yield put(actionGetAllAudiences());
    } catch(error) {
        console.log(error);
    }
}

export const appSagas = [
    takeEvery(AppActionTypes.ChangeAvatar, changeAvatarSaga)
];