import { Action } from "../../interfaces/store.interface";
import { LoginState } from "./login.state";
import { LoginActionTypes } from "./login.action";

export const loginReducer = (state: LoginState, action: Action): LoginState => {
  switch (action.type) {
    case LoginActionTypes.GenerateCode:
      return {
        ...state,
        emailAddress: action.payload,
        state: "generating",
      };
    case LoginActionTypes.GenerateCodeSuccess:
      return {
        ...state,
        state: "verify",
      };
    case LoginActionTypes.GenerateCodeFail:
      alert(`Error in generating verification code, error: ${action.payload}`);
      return {
        ...state,
        state: "generate",
      };
    default:
      return state;
  }
};
