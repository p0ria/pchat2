import { loginReducer } from './login/login.reducers';
import { combineReducers } from 'redux';
import { audienceReducer } from './audience/audience.reducer';
import { appReducer } from './app/app.reducer';

const rootReducer = combineReducers({
  login: loginReducer,
  audience: audienceReducer,
  app: appReducer
});

export default rootReducer;