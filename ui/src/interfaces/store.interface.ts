import AppState from "../state/app/app.state";
import AudienceState from "../state/audience/audience.state";
import LoginState from "../state/login/login.state";

export interface Action {
  type: string,
  payload?: any
}

export interface RootState {
  login: LoginState,
  audience: AudienceState,
  app: AppState
}