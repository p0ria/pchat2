import { loginReducer } from './login/login.reducers';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  login: loginReducer
});

export default rootReducer;