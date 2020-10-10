export const ME_QUERY = `
  {
    me {
      _id
      name
      email
      messages {
        _id
      }
    }
  }
`