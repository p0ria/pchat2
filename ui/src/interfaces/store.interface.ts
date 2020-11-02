import AppState from "../state/app/app.state";
import AudienceState from "../state/audience/audience.state";
import ChatState from "../state/chat/chat.state";
import LoginState from "../state/login/login.state";

export interface Action {
  type: string,
  payload?: any
}

export interface RootState {
  app: AppState,
  login: LoginState,
  audience: AudienceState,
  chat: ChatState
}