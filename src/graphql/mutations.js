export const CREATE_MESSAGE_MUTATION = `
  mutation($audienceId: ID!, $type: MessageType!, $value: String!) {
    createMessage(input: {
      audienceId: $audienceId,
      type: $type,
      value: $value
    }) {
      _id
      type
      value
      author {
        _id
        name
        email
      }
      audience {
        _id
        name
      }
    }
  }
`