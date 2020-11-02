import { all } from "redux-saga/effects";
import { appSagas } from "./app/app.effects";
import { audienceSagas } from "./audience/audience.effects";
import { chatSagas } from "./chat/chat.effects";
import { loginSagas } from "./login/login.effects";

export default function* rootSaga() {
    yield all([
        ...loginSagas,
        ...audienceSagas,
        ...appSagas,
        ...chatSagas
    ]);
}