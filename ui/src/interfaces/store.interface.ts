import LoginState from "../state/login/login.state";

export interface Action {
  type: string,
  payload?: any
}

export interface RootState {
  login: LoginState
}