import { gql } from '@apollo/client';

export const AUDIENCES_CHANGED_SUBSCRIPTION = gql`
subscription {
    audiencesChanged {
        _id
        type
        name
        avatarUrl
    }
}
`

export const MESSAGE_ADDED_SUBSCRIPTION = gql`
subscription {
    messageAdded {
        _id
        author {
            _id
        }
        type
        value
        audience {
            _id
        }
        createdAt
        updatedAt
    }
}
`