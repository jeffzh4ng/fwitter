import { gql, useQuery } from '@apollo/client'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import * as React from 'react'
import { ListOfTweets } from '../../../components/ListOfTweets'
import { DrawerParamList, HomeStackParamList, ProfileTabParamList } from '../../../types'

type ProfileTweetNavigationProp = CompositeNavigationProp<
  DrawerNavigationProp<DrawerParamList>,
  StackNavigationProp<HomeStackParamList, 'Profile'>
>
type ProfileTweetsRouteProp = RouteProp<ProfileTabParamList, 'Tweets'>

export interface ProfileTweetsTabProps {
  userId: string
}

interface Props {
  navigation: ProfileTweetNavigationProp
  route: ProfileTweetsRouteProp
}

export const GET_PROFILE_FEED_QUERY = gql`
  query ProfileFeedData($userId: String!) {
    getProfileFeed(userId: $userId) {
      ID
      text
      createdAt
      user {
        username
      }
    }
  }
`

export const Tweets = ({ route, navigation }: Props) => {
  React.useEffect(() => console.log(route.params.userId), [route])

  const { loading, error, data } = useQuery(GET_PROFILE_FEED_QUERY, {
    variables: { userId: route.params.userId },
  })

  const massagedData =
    data && data.getProfileFeed
      ? data.getProfileFeed.map((tweet: any) => ({ ...tweet, username: tweet.user.username }))
      : []

  const handleOnTweet = () =>
    navigation.replace('Tweet', {
      previousScreen: 'Profile',
      userId: route.params.userId,
    })

  return <ListOfTweets tweets={massagedData} onTweet={handleOnTweet} />
}
