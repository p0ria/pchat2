import { loginReducer } from './login/login.reducers';
import { combineReducers } from 'redux';
import { audienceReducer } from './audience/audience.reducer';
import { appReducer } from './app/app.reducer';
import { chatReducer } from './chat/chat.reducer';
import { webrtcReducer } from './webrtc/webrtc.reducer';

const rootReducer = combineReducers({
  app: appReducer,
  login: loginReducer,
  audience: audienceReducer,
  chat: chatReducer,
  webrtc: webrtcReducer
});

export default rootReducer;