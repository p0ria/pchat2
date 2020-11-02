export const ADD_MESSAGE_MUTATION = `
  mutation($audienceId: ID!, $type: MessageType!, $value: String!) {
    addMessage(input: {
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

export const CHANGE_AVATAR_MUTATION = `
  mutation($avatarUrl: String!) {
    changeAvatar(avatarUrl: $avatarUrl)
  }
`