export const ME_QUERY = `
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

export const AUDIENCES_QUERY = `
  {
    audiences {
      _id
      name
      type
      avatarUrl
    }
  } 
`