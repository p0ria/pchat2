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
        uiState: "generating",
        error: null,
      };
    case LoginActionTypes.GetVerificationCodeSuccess:
      return {
        ...state,
        uiState: "verify",
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
        uiState: "verifying",
        error: null,
      };
    case LoginActionTypes.VerifyCodeSuccess:
      return {
        ...state,
        uiState: "verified",
        error: null,
      };
    case LoginActionTypes.VerifyCodeFail:
      return {
        ...state,
        uiState: "verify",
        error: action.payload,
      };
    default:
      return state;
  }
};
