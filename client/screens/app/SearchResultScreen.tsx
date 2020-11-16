import { gql, useMutation, useQuery } from '@apollo/client'
import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import * as React from 'react'
import { TextInput, Text } from 'react-native'
import { ListOfTweets } from '../../components/ListOfTweets'
import { GET_PROFILE_FEED_QUERY } from '../../queries'
import { SearchStackParamList } from '../../types'
import { SearchTweetsData } from '../../__generated__/SearchTweetsData'

type SearchResultScreenNavigationProp = StackNavigationProp<SearchStackParamList, 'SearchResult'>
type SearchScreenRouteProp = RouteProp<SearchStackParamList, 'SearchResult'>

export interface SearchResultScreenProps {
  query: string
}

interface Props {
  navigation: SearchResultScreenNavigationProp
  route: SearchScreenRouteProp
}

const SEARCH_TWEETS_QUERY = gql`
  query SearchTweetsData($query: String!) {
    searchTweets(query: $query) {
      ID
      createdAt
      likes {
        ID
        user {
          ID
          username
        }
      }
      text
      type
      user {
        ID
        username
      }
    }
  }
`

export const SearchResultScreen = ({ navigation, route }: Props) => {
  const { data } = useQuery<SearchTweetsData>(SEARCH_TWEETS_QUERY, {
    variables: { query: route.params.query },
  })

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <TextInput
          value={route.params.query}
          onFocus={() => navigation.goBack()}
          style={{
            backgroundColor: '#efefef',
            borderRadius: 100,
            color: 'black',
            fontSize: 16,
            padding: 5,
            textAlign: 'center',
            width: 300,
          }}
        />
      ),
    })
  }, [navigation])

  if (!data) return <Text>Loading</Text>

  return (
    <ListOfTweets
      navigation={navigation}
      tweets={data.searchTweets}
      previousScreen="Search"
      refetchQueryInfo={{ query: GET_PROFILE_FEED_QUERY }}
    />
  )
}
