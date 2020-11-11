import { gql } from '@apollo/client'

export const ME_MUTATION = gql`
  mutation me {
    me {
      ID
      username
    }
  }
`
