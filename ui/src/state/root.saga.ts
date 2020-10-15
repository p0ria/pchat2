import { all } from "redux-saga/effects";
import { audienceSagas } from "./audience/audience.effects";
import { loginSagas } from "./login/login.effects";

export default function* rootSaga() {
    yield all([
        ...loginSagas,
        ...audienceSagas
    ]);
}