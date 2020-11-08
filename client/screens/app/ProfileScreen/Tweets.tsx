import { gql, useQuery } from '@apollo/client'
import { RouteProp } from '@react-navigation/native'
import * as React from 'react'
import { Text } from 'react-native'
import { ListOfTweets } from '../../../components/LIstOfTweets'
import { ProfileTabParamList } from '../../../types'

type ProfileTweetsRouteProp = RouteProp<ProfileTabParamList, 'Tweets'>

export interface ProfileTweetsTabProps {
  userId: string
}

interface Props {
  route: ProfileTweetsRouteProp
}

const GET_PROFILE_FEED_QUERY = gql`
  query GetProfileFeed($userId: String!) {
    getProfileFeed(userId: $userId) {
      ID
      text
    }
  }
`

export const Tweets = ({ route }: Props) => {
  const { loading, error, data } = useQuery(GET_PROFILE_FEED_QUERY, {
    variables: { userId: route.params.userId },
  })
  return <ListOfTweets tweets={data.getProfileFeed} onTweet={() => {}} />
}
