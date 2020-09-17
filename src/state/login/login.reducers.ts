import { Action } from "../../interfaces/store.interface";
import LoginState, { initialLoginState } from "./login.state";
import { LoginActionTypes } from "./login.actions";

export const loginReducer = (
  state: LoginState = initialLoginState,
  action: Action
): LoginState => {
  switch (action.type) {
    case LoginActionTypes.GetVerificationCode:
      return {
        ...state,
        emailAddress: action.payload,
        uiState: "loading",
        error: null,
      };
    case LoginActionTypes.GetVerificationCodeSuccess:
      return {
        ...state,
        uiState: "verify",
        resent: true,
        error: null,
      };
    case LoginActionTypes.GetVerificationCodeFail:
      return {
        ...state,
        uiState: "generate",
        error: action.payload,
      };
    case LoginActionTypes.VerifyCode:
      return {
        ...state,
        uiState: "loading",
        error: null,
      };
    case LoginActionTypes.VerifyCodeSuccess:
      return {
        ...state,
        uiState: "verified",
        token: action.payload,
        error: null,
      };
    case LoginActionTypes.VerifyCodeFail:
      return {
        ...state,
        uiState: "verify",
        error: action.payload,
      };
    case LoginActionTypes.ResendVerificationCode:
      return {
        ...state,
        resent: false,
        error: null
      };
    case LoginActionTypes.ResendVerificationCodeSuccess:
      return {
        ...state,
        resent: true,
        error: null
      };
    case LoginActionTypes.ResendVerificationCodeFail:
      return {
        ...state,
        resent: false,
        error: action.payload
      };
    case LoginActionTypes.LoginByGoogle:
      return {
        ...state,
        uiState: "loading",
        error: null
      };
    case LoginActionTypes.LoginSuccess:
      return {
        ...state,
        emailAddress: action.payload,
        error: null
      };
    case LoginActionTypes.LoadTokenSuccess:
      return {
        ...state,
        token: action.payload,
        error: null
      };
    case LoginActionTypes.LoadTokenFail:
      return {
        ...state,
        token: null
      };
    default:
      return state;
  }
};
