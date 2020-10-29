import { GraphQLClient } from "graphql-request";
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { actionAppReconnected } from "../state/app/app.actions";

const client = new GraphQLClient(process.env.REACT_APP_GRAPHQL_URL);

export function createWsClient(token, dispatch) {
    const wsLink = new WebSocketLink({
        uri: process.env.REACT_APP_WS_URL,
        options: {
            reconnect: true,
            connectionParams: {
                authToken: token
            },
            connectionCallback: error => {
                if (!error) {
                    dispatch(actionAppReconnected());
                }
            }
        }
    });
    return new ApolloClient({
        link: wsLink,
        cache: new InMemoryCache()
    })
}

export default client;