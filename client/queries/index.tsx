import { gql } from '@apollo/client'

export const GET_PROFILE_FEED_QUERY = gql`
  query ProfileFeedData($userId: ID!) {
    getProfileFeed(userId: $userId) {
      ID
      text
      createdAt
      type
      parent {
        ID
        text
        createdAt
        likes {
          ID
          user {
            ID
            username
          }
        }
        user {
          ID
          username
        }
      }
      user {
        ID
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
