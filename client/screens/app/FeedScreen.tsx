import * as React from 'react'
import { Text } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { DrawerParamList } from '../../types'
import { gql, useMutation, useQuery } from '@apollo/client'
import { LIKE_TWEET_MUTATION } from '../../mutations'
import { FeedData } from '../../__generated__/FeedData'
import { ListOfTweets } from '../../components/ListOfTweets'
import { GET_PROFILE_FEED_QUERY } from '../../queries'

type FeedScreenNavigationProp = StackNavigationProp<DrawerParamList, 'Root'>

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
    }
  }
`

export const FeedScreen = ({ navigation }: Props) => {
  const { error, data } = useQuery<FeedData>(GET_FEED_QUERY)
  const [likeTweet] = useMutation(LIKE_TWEET_MUTATION)

  if (!data) return <Text>Loading</Text>

  const handleOnTweet = () =>
    navigation.replace('Tweet', {
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

  return (
    <ListOfTweets tweets={data.getFeed} handleOnTweet={handleOnTweet} handleOnLike={handleOnLike} />
  )
}
