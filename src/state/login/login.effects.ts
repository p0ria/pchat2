import { Action } from "./../../interfaces/store.interface";
import { Apis } from "./../../services/api";

import { call, takeEvery, put } from "redux-saga/effects";
import api from "../../services/api";
import {
  LoginActionTypes,
  loginGetVerificationCodeSuccess,
  loginGetVerificationCodeFail,
  loginVerifyCodeFail,
  loginVerifyCodeSuccess,
  loginFail,
} from "./login.actions";

export function* getVerificationCode(action: Action) {
  try {
    yield call(api, Apis.getVerificationCode, { url: action.payload });
    yield put(loginGetVerificationCodeSuccess());
  } catch (error) {
    yield put(loginGetVerificationCodeFail("Network error, please try latter"));
  }
}

export function* verifyCode(action: Action) {
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

export function* loginGoogle(action: Action) {
  try {
    const token = yield call(api, Apis.loginByGoogle, {data: {tokenId: action.payload}});
    console.log("TOKEN: ", token);
  } catch (error) {
    yield put(loginFail(error));
  }
}

export function* loginSaga() {
  yield takeEvery(LoginActionTypes.GetVerificationCode, getVerificationCode);
  yield takeEvery(LoginActionTypes.VerifyCode, verifyCode);
  yield takeEvery(LoginActionTypes.LoginByGoogle, loginGoogle);
}
