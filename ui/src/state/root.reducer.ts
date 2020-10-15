import { loginReducer } from './login/login.reducers';
import { combineReducers } from 'redux';
import { audienceReducer } from './audience/audience.reducer';

const rootReducer = combineReducers({
  login: loginReducer,
  audience: audienceReducer
});

export default rootReducer;