import { gql } from "graphql-request";

export const ME_QUERY = gql`
  {
    me {
      _id
      name
      email
      audiences {
        _id
      }
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
        type
      }
    }
  }
`