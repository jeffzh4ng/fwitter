import { gql, useMutation, useQuery } from '@apollo/client'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import * as React from 'react'
import { ListOfTweets } from '../../../components/ListOfTweets'
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

export const GET_PROFILE_FEED_QUERY = gql`
  query ProfileFeedData($userId: String!) {
    getProfileFeed(userId: $userId) {
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

const LIKE_TWEET_MUTATION = gql`
  mutation LikedTweetData($tweetId: ID!) {
    likeTweet(tweetId: $tweetId) {
      ID
    }
  }
`

export const Tweets = ({ route, navigation }: Props) => {
  const { data: profileData } = useQuery<ProfileFeedData>(GET_PROFILE_FEED_QUERY, {
    variables: { userId: route.params.userId },
  })
  const [likeTweet, { data: likedTweetData }] = useMutation(LIKE_TWEET_MUTATION)

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
      userId: route.params.userId,
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
