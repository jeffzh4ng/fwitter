import { gql, useQuery } from '@apollo/client'
import { AntDesign, FontAwesome } from '@expo/vector-icons'
import { RouteProp } from '@react-navigation/native'
import moment from 'moment'
import * as React from 'react'
import { Image, Pressable, SafeAreaView, Text, View } from 'react-native'
import { HomeStackParamList } from '../../types'
import {
  FocusedTweetData,
  FocusedTweetData_getTweetById,
} from '../../__generated__/FocusedTweetData'

export interface FocusedTweetScreenProps {
  tweetId: string
}

type FocusedTweetScreenRouteProp = RouteProp<HomeStackParamList, 'FocusedTweet'>

interface Props {
  route: FocusedTweetScreenRouteProp
}

const GET_TWEET_BY_ID_QUERY = gql`
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
    }
  }
`

export const FocusedTweetScreen = ({ route }: Props) => {
  const { data } = useQuery<FocusedTweetData>(GET_TWEET_BY_ID_QUERY, {
    variables: { tweetId: route.params.tweetId },
  })

  if (!data) return <Text>Loading</Text>

  const tweet = data.getTweetById

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
                // handleOnReply(tweet.ID)
              }}
            >
              <FontAwesome name="comment-o" size={17} color="#6A7A89" />
            </Pressable>

            <View style={{ flexDirection: 'row' }}>
              <Pressable onPress={() => 1 /* handle on like */}>
                <AntDesign name="hearto" size={17} color="#6A7A89" />
              </Pressable>
              <Text style={{ marginLeft: 3 }}>{tweet.likes.length}</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}
