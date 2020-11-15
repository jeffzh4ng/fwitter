import * as React from 'react'
import { Text } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { HomeStackParamList } from '../../types'
import { gql, useQuery } from '@apollo/client'
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
        ID
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

  if (!data) return <Text>Loading</Text>

  return (
    <ListOfTweets
      navigation={navigation}
      tweets={data.getFeed}
      previousScreen="Feed"
      refetchQueryInfo={{ query: GET_FEED_QUERY }}
    />
  )
}
