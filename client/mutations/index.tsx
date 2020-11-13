import { gql } from '@apollo/client'

export const ME_MUTATION = gql`
  mutation meData {
    me {
      ID
      username
    }
  }
`
