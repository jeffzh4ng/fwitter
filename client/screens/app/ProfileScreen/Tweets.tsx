import { useQuery } from '@apollo/client'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import * as React from 'react'
import { ListOfTweets } from '../../../components/ListOfTweets'
import { GET_PROFILE_FEED_QUERY } from '../../../queries'
import { DrawerParamList, HomeStackParamList, ProfileTabParamList } from '../../../types'
import { ProfileFeedData } from '../../../__generated__/ProfileFeedData'
import { Text } from 'react-native'

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
  const { data } = useQuery<ProfileFeedData>(GET_PROFILE_FEED_QUERY, {
    variables: { userId: route.params.userId },
  })

  if (!data) return <Text>Loading</Text>

  return (
    <ListOfTweets
      navigation={navigation}
      tweets={data.getProfileFeed}
      previousScreen="Feed"
      refetchQueryInfo={{
        query: GET_PROFILE_FEED_QUERY,
        variables: { userId: route.params.userId },
      }}
    />
  )
}
