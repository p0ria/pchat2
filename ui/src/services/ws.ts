import { AUDIENCES_CHANGED_SUBSCRIPTION, MESSAGE_ADDED_SUBSCRIPTION } from "../graphql/subscriptions";
import { actionAudiencesChanged } from "../state/audience/audience.actions";
import { actionMessageAdded } from "../state/chat/chat.actions";
import { createWsClient } from "./client";

export default function subscribeToWS(token, dispatch) {
    const wsClient = createWsClient(token, dispatch);
    subscribeToAudiencesChanged(wsClient, dispatch);
    subscribeToMessageAdded(wsClient, dispatch);
}

function subscribeToAudiencesChanged(wsClient, dispatch) {
    wsClient.subscribe({
        query: AUDIENCES_CHANGED_SUBSCRIPTION
    }).subscribe({
        next({ data }) {
            dispatch(actionAudiencesChanged(data.audiencesChanged));
        },
        error(err) { console.error(err) }
    });
}

function subscribeToMessageAdded(wsClient, dispatch) {
    wsClient.subscribe({
        query: MESSAGE_ADDED_SUBSCRIPTION
    }).subscribe({
        next({ data }) {
            const messageAdded = {
                ...data.messageAdded,
                value: JSON.parse(data.messageAdded.value)
            }
            dispatch(actionMessageAdded(messageAdded));
        }
    })
}