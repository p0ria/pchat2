import { AUDIENCES_CHANGED_SUBSCRIPTION } from "../graphql/subscriptions";
import { actionAudiencesChanged } from "../state/audience/audience.actions";
import { createWsClient } from "./client";

export default function subscribeToWS(token, dispatch) {
    const wsClient = createWsClient(token, dispatch);
    subscribeToAudiencesChanged(wsClient, dispatch);
}

function subscribeToAudiencesChanged(wsClient, dispatch) {
    wsClient.subscribe({
        query: AUDIENCES_CHANGED_SUBSCRIPTION
    }).subscribe({
        next({ data }) {
            console.log(data.audiencesChanged);
            dispatch(actionAudiencesChanged(data.audiencesChanged));
        },
        error(err) { console.error(err) }
    });
}