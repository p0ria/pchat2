import { Action } from "./../../interfaces/store.interface";
import { Apis } from "./../../services/api";

import { call, takeEvery, put, select } from "redux-saga/effects";
import api from "../../services/api";
import {
  LoginActionTypes,
  loginGetVerificationCodeSuccess,
  loginGetVerificationCodeFail,
  loginVerifyCodeFail,
  loginVerifyCodeSuccess,
  loginFail,
  loginSuccess,
  loginGetVerificationCode,
} from "./login.actions";
import { selectEmailAddress } from "./login.selectors";

export function* getVerificationCodeSaga(action: Action) {
  try {
    const email = yield select(selectEmailAddress);
    yield call(api, Apis.getVerificationCode, { url: email });
    yield put(loginGetVerificationCodeSuccess());
  } catch (error) {
    yield put(loginGetVerificationCodeFail("Network error, please try latter"));
  }
}

export function* verifyCodeSaga(action: Action) {
  try {
    const {
      data: { verificationStatus },
    } = yield call(api, Apis.verifyCode, {
      url: action.payload.email,
      data: { code: action.payload.code },
    });
    yield put(
      verificationStatus === "Verified"
        ? loginVerifyCodeSuccess()
        : loginVerifyCodeFail("Code not verified")
    );
  } catch (error) {
    yield put(loginVerifyCodeFail("Error in verifying code"));
  }
}

export function* loginByGoogleSaga(action: Action) {
  try {
    const {data: {email, access_token}} = yield call(api, Apis.loginByGoogle, {data: {tokenId: action.payload}});
    yield checkTokenSaga(email, access_token);
  } catch (error) {
    yield put(loginFail(error));
  }
}

export function* loginByEmailSaga(action: Action) {
  const {data: {email, access_token}} = yield call(api, Apis.loginByEmail, {data: {email: action.payload}});
  yield checkTokenSaga(email, access_token);
}

function* checkTokenSaga(email: string, access_token: string) {
  if(email && access_token) yield put(loginSuccess({email, token: access_token}));
}

export function* loginSuccessSaga(action: Action) {
  try {
    yield put(loginGetVerificationCode());
  } catch (error) {
    yield put(loginFail(error));
  }
}

export function* loginSaga() {
  yield takeEvery(LoginActionTypes.GetVerificationCode, getVerificationCodeSaga);
  yield takeEvery(LoginActionTypes.VerifyCode, verifyCodeSaga);
  yield takeEvery(LoginActionTypes.LoginByGoogle, loginByGoogleSaga);
  yield takeEvery(LoginActionTypes.LoginByEmail, loginByEmailSaga);
  yield takeEvery(LoginActionTypes.LoginSuccess, loginSuccessSaga);
}


