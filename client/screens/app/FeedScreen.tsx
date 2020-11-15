import * as React from 'react'
import { Text } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { HomeStackParamList } from '../../types'
import { gql, useMutation, useQuery } from '@apollo/client'
import { LIKE_TWEET_MUTATION, ME_MUTATION } from '../../mutations'
import { FeedData, FeedData_getFeed } from '../../__generated__/FeedData'
import { ListOfTweets } from '../../components/ListOfTweets'
import { meData } from '../../__generated__/meData'

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
  const { data } = useQuery<FeedData>(GET_FEED_QUERY)
  const [likeTweet] = useMutation(LIKE_TWEET_MUTATION)

  const [me, { data: meDataResult }] = useMutation<meData>(ME_MUTATION)

  React.useEffect(() => {
    me()
  }, [])

  if (!data || !meDataResult) return <Text>Loading</Text>

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

  const massagedTweets: Array<FeedData_getFeed & { liked: boolean }> = data.getFeed.map((tweet) => {
    const userId = meDataResult.me.ID

    let liked = false
    if (tweet.likes.some((like) => like.user.ID === userId)) liked = true

    return {
      ...tweet,
      liked,
    }
  })

  return (
    <ListOfTweets
      tweets={massagedTweets}
      handleOnTweet={handleOnTweet}
      handleOnLike={handleOnLike}
      handleOnReply={handleOnReply}
      handleOnNavigateToTweet={handleOnNavigateToTweet}
    />
  )
}
