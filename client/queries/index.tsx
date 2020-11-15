import { gql } from '@apollo/client'

export const GET_PROFILE_FEED_QUERY = gql`
  query ProfileFeedData($userId: ID!) {
    getProfileFeed(userId: $userId) {
      ID
      text
      createdAt
      type
      user {
        username
      }
      likes {
        ID
        user {
          ID
          username
        }
      }
    }
  }
`
