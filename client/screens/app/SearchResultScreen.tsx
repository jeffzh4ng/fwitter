import { gql, useMutation, useQuery } from '@apollo/client'
import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import * as React from 'react'
import { TextInput, Text } from 'react-native'
import { ListOfTweets } from '../../components/ListOfTweets'
import { LIKE_TWEET_MUTATION, ME_MUTATION } from '../../mutations'
import { SearchStackParamList } from '../../types'
import { meData } from '../../__generated__/meData'
import {
  SearchTweetsData,
  SearchTweetsData_searchTweets,
} from '../../__generated__/SearchTweetsData'

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
  const [me, { data: meDataResult }] = useMutation<meData>(ME_MUTATION)
  const [likeTweet] = useMutation(LIKE_TWEET_MUTATION)

  React.useEffect(() => {
    me()
  }, [])

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

  if (!data || !meDataResult) return <Text>Loading</Text>

  const handleOnLike = (tweetId: string) =>
    likeTweet({
      variables: { tweetId },
      refetchQueries: [
        {
          query: SEARCH_TWEETS_QUERY,
          variables: { query: route.params.query },
        },
      ],
    })

  const handleOnReply = (tweetId: string) =>
    navigation.navigate('Feed', {
      screen: 'CreateTweet',
      params: {
        parentId: tweetId,
        previousScreen: 'Feed',
      },
    })

  const handleOnNavigateToTweet = (tweetId: string) =>
    navigation.navigate('Feed', {
      screen: 'FocusedTweet',
      params: {
        tweetId,
      },
    })

  const massagedTweets: Array<
    SearchTweetsData_searchTweets & { liked: boolean }
  > = data.searchTweets.map((tweet) => {
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
      handleOnTweet={null}
      handleOnLike={handleOnLike}
      handleOnNavigateToTweet={handleOnNavigateToTweet}
      handleOnReply={handleOnReply}
    />
  )
}
