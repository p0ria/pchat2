import { gql } from "graphql-request";

export const ME_QUERY = gql`
  {
    me {
      _id
      name
      email
    }
  }
`;

export const AUDIENCES_QUERY = gql`
  {
    audiences {
      _id
      name
      type
      avatarUrl
    }
  } 
`

export const AUDIENCE_QUERY = gql`
  query($audienceId: ID!) {
    audience(id: $audienceId) {
      _id
      name
      type
      avatarUrl
      messages {
        _id
        author {
          _id
          avatarUrl
        }
        type
        value
        createdAt
        updatedAt
      }
    }
  }
`

export const AUDIENEC_IMPL_QUERY = gql`
  query($audienceId: ID!) {
    audienceImpl(id: $audienceId) {
      __typename
      ... on Private {
        _id
        user1 {
          _id
        }
        user2 {
          _id
        }
      }
    }
  }
`