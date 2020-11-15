import { gql, useMutation, useQuery } from '@apollo/client'
import { AntDesign, FontAwesome } from '@expo/vector-icons'
import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import moment from 'moment'
import * as React from 'react'
import { Image, Pressable, SafeAreaView, Text, View } from 'react-native'
import { ListOfTweets } from '../../components/ListOfTweets'
import { LIKE_TWEET_MUTATION, ME_MUTATION } from '../../mutations'
import { HomeStackParamList } from '../../types'
import { FocusedTweetData } from '../../__generated__/FocusedTweetData'
import { meData } from '../../__generated__/meData'

export interface FocusedTweetScreenProps {
  tweetId: string
}

type FocusedTweetNavigationProp = StackNavigationProp<HomeStackParamList, 'Feed'>
type FocusedTweetScreenRouteProp = RouteProp<HomeStackParamList, 'FocusedTweet'>

interface Props {
  navigation: FocusedTweetNavigationProp
  route: FocusedTweetScreenRouteProp
}

export const GET_TWEET_BY_ID_QUERY = gql`
  query FocusedTweetData($tweetId: ID!) {
    getTweetById(tweetId: $tweetId) {
      ID
      text
      type
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
      }
    }
  }
`

export const FocusedTweetScreen = ({ navigation, route }: Props) => {
  const { data } = useQuery<FocusedTweetData>(GET_TWEET_BY_ID_QUERY, {
    variables: { tweetId: route.params.tweetId },
  })
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
          query: GET_TWEET_BY_ID_QUERY,
          variables: {
            tweetId: route.params.tweetId,
          },
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

  const tweet = data.getTweetById.likes.some((like) => like.user.ID === meDataResult.me.ID)
    ? { ...data.getTweetById, liked: true }
    : { ...data.getTweetById, liked: false }

  return (
    <SafeAreaView>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          borderBottomColor: '#eee',
          borderBottomWidth: 1,
          paddingVertical: 10,
          paddingHorizontal: 15,
        }}
      >
        <View style={{}}>
          <Image
            style={{ borderRadius: 100, height: 50, width: 50 }}
            source={{
              uri: 'https://image.flaticon.com/icons/png/512/194/194938.png',
            }}
          />
        </View>
        <View style={{ flexShrink: 1, marginLeft: 10 }}>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            {/* <Text style={{ fontSize: 16, fontWeight: '700' }}>John Doe</Text> */}
            <Text style={{ fontSize: 16, marginLeft: 3 }}>@{tweet.user.username}</Text>
            <Text style={{ fontSize: 16, marginLeft: 3 }}>
              • {moment(tweet.createdAt).fromNow()}
            </Text>
          </View>
          <Text style={{ flexShrink: 1, fontSize: 16 }}>{tweet.text}</Text>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Pressable
              onPress={() => {
                handleOnReply(tweet.ID)
              }}
            >
              <FontAwesome name="comment-o" size={17} color="#6A7A89" />
            </Pressable>

            <View style={{ flexDirection: 'row' }}>
              <Pressable onPress={() => handleOnLike(tweet.ID)}>
                {tweet.liked ? (
                  <AntDesign name="heart" size={17} color="red" />
                ) : (
                  <AntDesign name="hearto" size={17} color={'#6A7A89'} />
                )}
              </Pressable>
              <Text style={{ marginLeft: 3 }}>{tweet.likes.length}</Text>
            </View>
          </View>
        </View>
      </View>

      <ListOfTweets
        tweets={tweet.children}
        handleOnTweet={handleOnTweet}
        handleOnLike={handleOnLike}
        handleOnReply={handleOnReply}
        handleOnNavigateToTweet={handleOnNavigateToTweet}
      />
    </SafeAreaView>
  )
}
