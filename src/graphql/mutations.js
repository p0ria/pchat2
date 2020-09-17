export const CREATE_MESSAGE_MUTATION = `
  mutation($type: MessageType!, $value: String!) {
    createMessage(input: {
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
    }
  }
`