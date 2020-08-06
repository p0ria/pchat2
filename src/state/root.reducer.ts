import { loginReducer } from './login/login.reducer';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  login: loginReducer
});

export default rootReducer;