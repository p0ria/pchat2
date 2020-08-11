import { Action } from './../../interfaces/store.interface';
import { Apis } from './../../services/api';

import { call, takeEvery, put } from 'redux-saga/effects'
import api from "../../services/api";
import { LoginActionTypes, loginGetVerificationCodeSuccess, loginGetVerificationCodeFail, loginVerifyCodeFail, loginVerifyCodeSuccess } from './login.actions';

export function* getVerificationCode(action: Action) {
  try {
    yield call(api, Apis.getVerificationCode, {url: action.payload});
    yield put(loginGetVerificationCodeSuccess());
  } catch (error) {
    yield put(loginGetVerificationCodeFail("Network error, please try latter"));
  }
}

export function* verifyCode(action: Action) {
  try {
    console.log(action);
    yield call(api, Apis.verifyCode, {url: action.payload.email, data: {code: action.payload.code}});
    yield put(loginVerifyCodeSuccess());
  } catch (error) {
    yield put(loginVerifyCodeFail("Error in verifying code"));
  }
}

export function* loginSaga() {
  yield takeEvery(LoginActionTypes.GetVerificationCode, getVerificationCode);
  yield takeEvery(LoginActionTypes.VerifyCode, verifyCode);
}

