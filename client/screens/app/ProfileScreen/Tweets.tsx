import { gql, useMutation, useQuery } from '@apollo/client'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import * as React from 'react'
import { ListOfTweets } from '../../../components/ListOfTweets'
import { LIKE_TWEET_MUTATION } from '../../../mutations'
import { GET_PROFILE_FEED_QUERY } from '../../../queries'
import { DrawerParamList, HomeStackParamList, ProfileTabParamList } from '../../../types'
import {
  ProfileFeedData,
  ProfileFeedData_getProfileFeed,
} from '../../../__generated__/ProfileFeedData'

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

export const Tweets = ({ route, navigation }: Props) => {
  const { data: profileData } = useQuery<ProfileFeedData>(GET_PROFILE_FEED_QUERY, {
    variables: { userId: route.params.userId },
  })
  const [likeTweet] = useMutation(LIKE_TWEET_MUTATION)

  const massagedData =
    profileData && profileData.getProfileFeed
      ? profileData.getProfileFeed.map((tweet: ProfileFeedData_getProfileFeed) => ({
          ...tweet,
          username: tweet.user.username,
        }))
      : []

  const handleOnTweet = () =>
    navigation.replace('Tweet', {
      previousScreen: 'Profile',
    })

  const handleOnLike = (tweetId: string) =>
    likeTweet({
      variables: { tweetId },
      refetchQueries: [
        {
          query: GET_PROFILE_FEED_QUERY,
          variables: {
            userId: route.params.userId,
          },
        },
      ],
    })

  return (
    <ListOfTweets tweets={massagedData} handleOnTweet={handleOnTweet} handleOnLike={handleOnLike} />
  )
}
