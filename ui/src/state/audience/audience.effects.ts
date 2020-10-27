import { actionGetAllAudiencesSuccess, AudienceActionTypes } from './audience.actions';
import { call, getContext, put, select, takeEvery } from "redux-saga/effects";
import { Action } from "./../../interfaces/store.interface";
import { selectToken } from '../login/login.selectors';
import { AUDIENCES_QUERY } from '../../graphql/queries';

export function* getAllAudiencesSaga(action: Action) {
    try {
        const token = yield select(selectToken);
        const client = yield getContext('client');
        client.setHeader('authorization', token);
        const { audiences } = yield call(client.request.bind(client), AUDIENCES_QUERY);
        yield put(actionGetAllAudiencesSuccess(audiences))
    } catch (error) {
        console.error(error);
    }
}

export const audienceSagas = [
    takeEvery(AudienceActionTypes.GetAllAudiences, getAllAudiencesSaga)
];