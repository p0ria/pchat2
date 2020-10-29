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