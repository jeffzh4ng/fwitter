import { gql } from '@apollo/client'

export const ME_MUTATION = gql`
  mutation meData {
    me {
      ID
      username
      name
      bio
      website
      following {
        ID
      }
      followers {
        ID
      }
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

export const CREATE_TWEET_MUTATION = gql`
  mutation CreatedTweetData($text: String!, $type: TweetType!, $parentId: ID = null) {
    createTweet(text: $text, type: $type, parentId: $parentId) {
      ID
      text
      type
    }
  }
`
