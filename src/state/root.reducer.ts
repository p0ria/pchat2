import { Store } from './store';
import { combineReducers } from "../commons/store-utilities";
import { loginReducer } from './login/login.reducer';

export const rootReducer = combineReducers<Store>({
  login: loginReducer
});