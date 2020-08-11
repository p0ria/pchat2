import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./root.reducer";

import createSagaMiddleware from "redux-saga";
import { loginSaga } from "./login/login.effects";

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers =
  typeof window === "object" && window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"]
    ? window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"]({})
    : compose;
const enhancer = composeEnhancers(
  applyMiddleware(sagaMiddleware /*other middleware*/)
  /* other store enhancers if any */
);
const store = createStore(rootReducer, enhancer);
sagaMiddleware.run(loginSaga);

export default store;
