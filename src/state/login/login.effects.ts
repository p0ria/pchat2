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
  loginResendVerificationCodeSuccess,
  loginResendVerificationCodeFail,
  loadTokenSuccess,
  loadTokenFail,
  loadToken,
} from "./login.actions";
import { selectEmailAddress } from "./login.selectors";
import { TOKEN_KEY } from "../../commons/constants";
import { useHistory } from "react-router-dom";

export function* getVerificationCodeSaga(action: Action) {
  try {
    yield call(api, Apis.getVerificationCode, { url: action.payload });
    yield put(loginGetVerificationCodeSuccess());
  } catch (error) {
    yield put(loginGetVerificationCodeFail("Network error, please try latter"));
  }
}

export function* resendVerificationCodeSaga(action: Action) {
  try {
    const email = yield select(selectEmailAddress);
    yield call(api, Apis.getVerificationCode, { url: email });
    yield put(loginResendVerificationCodeSuccess());
  } catch (error) {
    yield put(loginResendVerificationCodeFail("Network error, please try latter"));
  }
}

export function* verifyCodeSaga(action: Action) {
  try {
    const {
      data: { access_token },
    } = yield call(api, Apis.verifyCode, {
      url: action.payload.email,
      data: { code: action.payload.code },
    });
    if (access_token) {
      localStorage.setItem(TOKEN_KEY, access_token);
      yield put(loginVerifyCodeSuccess(access_token));
    } else {
      yield put(loginVerifyCodeFail("Code not verified"));
    }
  } catch (error) {
    yield put(loginVerifyCodeFail("Error in verifying code"));
  }
}

export function* loginByGoogleSaga(action: Action) {
  try {
    const { data: { email } } = yield call(api, Apis.loginByGoogle, { data: { tokenId: action.payload } });
    yield put(loginSuccess(email));
  } catch (error) {
    yield put(loginFail(error));
  }
}

export function* loginSuccessSaga(action: Action) {
  try {
    const email = yield select(selectEmailAddress);
    yield put(loginGetVerificationCode(email));
  } catch (error) {
    yield put(loginFail(error));
  }
}

export function* loadTokenSaga(action: Action) {
  const token = localStorage.getItem(TOKEN_KEY);
  yield put(token ? loadTokenSuccess(token) : loadTokenFail());
}

export function* loginSaga() {
  yield takeEvery(LoginActionTypes.GetVerificationCode, getVerificationCodeSaga);
  yield takeEvery(LoginActionTypes.ResendVerificationCode, resendVerificationCodeSaga);
  yield takeEvery(LoginActionTypes.VerifyCode, verifyCodeSaga);
  yield takeEvery(LoginActionTypes.LoginByGoogle, loginByGoogleSaga);
  yield takeEvery(LoginActionTypes.LoginSuccess, loginSuccessSaga);
  yield takeEvery(LoginActionTypes.LoadToken, loadTokenSaga);
}


