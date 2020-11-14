import { gql } from '@apollo/client'

export const ME_MUTATION = gql`
  mutation meData {
    me {
      ID
      username
    }
  }
`

export const LIKE_TWEET_MUTATION = gql`
  mutation LikedTweetData($tweetId: ID!) {
    likeTweet(tweetId: $tweetId) {
      ID
    }
  }
`
