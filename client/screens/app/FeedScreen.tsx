import * as React from 'react'
import { Text } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { HomeStackParamList } from '../../types'
import { gql, useMutation, useQuery } from '@apollo/client'
import { LIKE_TWEET_MUTATION } from '../../mutations'
import { FeedData } from '../../__generated__/FeedData'
import { ListOfTweets } from '../../components/ListOfTweets'

type FeedScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'Feed'>

interface Props {
  navigation: FeedScreenNavigationProp
}

const GET_FEED_QUERY = gql`
  query FeedData {
    getFeed {
      ID
      text
      createdAt
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
      children {
        ID
        text
        createdAt
      }
    }
  }
`

export const FeedScreen = ({ navigation }: Props) => {
  const { error, data } = useQuery<FeedData>(GET_FEED_QUERY)
  const [likeTweet] = useMutation(LIKE_TWEET_MUTATION)

  if (!data) return <Text>Loading</Text>

  const handleOnTweet = () =>
    navigation.replace('CreateTweet', {
      previousScreen: 'Profile',
    })

  const handleOnLike = (tweetId: string) =>
    likeTweet({
      variables: { tweetId },
      refetchQueries: [
        {
          query: GET_FEED_QUERY,
        },
      ],
    })

  const handleOnReply = (tweetId: string) =>
    navigation.replace('CreateTweet', {
      parentId: tweetId,
      previousScreen: 'Feed',
    })

  const handleOnNavigateToTweet = (tweetId: string) =>
    navigation.push('FocusedTweet', {
      tweetId,
    })

  return (
    <ListOfTweets
      tweets={data.getFeed}
      handleOnTweet={handleOnTweet}
      handleOnLike={handleOnLike}
      handleOnReply={handleOnReply}
      handleOnNavigateToTweet={handleOnNavigateToTweet}
    />
  )
}
