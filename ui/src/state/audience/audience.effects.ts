import { AudienceActionTypes } from './audience.actions';
import { call, select, takeEvery } from "redux-saga/effects";
import { Action } from "./../../interfaces/store.interface";
import { GraphQLClient } from 'graphql-request';
import { selectToken } from '../login/login.selectors';
import { AUDIENCES_QUERY } from '../../graphql/queries';

export function* getAllAudiencesSaga(action: Action) {
    try {
        const token = yield select(selectToken);
        const client = new GraphQLClient('http://localhost:4000/graphql', {
            headers: { authorization: token }
        });
        const x = yield call(client.request, AUDIENCES_QUERY);
    } catch (error) {

    }
}

export function* audienceSaga() {
    yield takeEvery(AudienceActionTypes.GetAllAudiences, getAllAudiencesSaga);
}