import { Action } from "../../interfaces/store.interface";
import LoginState, {initialLoginState, LoginUiState } from "./login.state";
import { LoginActionTypes } from "./login.action";

export const loginReducer = (state: LoginState = initialLoginState, action: Action): LoginState => {
  switch (action.type) {
    case LoginActionTypes.GenerateCode:
      return {
        ...state,
        emailAddress: action.payload,
        uiState: "generating"
      };
    case LoginActionTypes.GenerateCodeSuccess:
      return {
        ...state,
        uiState: "verify"
      };
    case LoginActionTypes.GenerateCodeFail:
      alert(`Error in generating verification code, error: ${action.payload}`);
      return {
        ...state,
        uiState: "generate"
      };
    default:
      return state;
  }
};
