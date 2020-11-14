import { gql, useMutation } from '@apollo/client'
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack/lib/typescript/src/types'
import * as React from 'react'
import { Text, Button, Image, TextInput, View, TouchableOpacity } from 'react-native'
import { DrawerParamList, HomeStackParamList } from '../../types'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import { GET_PROFILE_FEED_QUERY } from './ProfileScreen/Tweets'
import { TweetType } from '../../__generated__/globalTypes'
import { ME_MUTATION } from '../../mutations'
import { meData } from '../../__generated__/meData'

type TweetScreenNavigationProp = CompositeNavigationProp<
  DrawerNavigationProp<DrawerParamList>,
  StackNavigationProp<HomeStackParamList, 'Tweet'>
>
type TweetScreenRouteProp = RouteProp<HomeStackParamList, 'Tweet'>

export interface TweetScreenProps {
  previousScreen: 'Feed' | 'Profile'
}

interface Props {
  navigation: TweetScreenNavigationProp
  route: TweetScreenRouteProp
}

const CREATE_TWEET_MUTATION = gql`
  mutation CreatedTweetData($text: String!, $type: TweetType!) {
    createTweet(text: $text, type: $type) {
      ID
      text
      type
    }
  }
`

export const CreateTweetScreen = ({ navigation, route }: Props) => {
  const [tweetText, setTweet] = React.useState('')
  const [createTweet] = useMutation(CREATE_TWEET_MUTATION)

  const [me, { loading, data }] = useMutation<meData>(ME_MUTATION)

  React.useEffect(() => {
    me()
  }, [])

  React.useLayoutEffect(() => {
    if (!data) return
    navigation.setOptions({
      headerTitle: '',
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.replace(route.params.previousScreen)
          }}
        >
          <Text style={{ color: '#1FA1F1', fontSize: 16, marginLeft: 10 }}>Cancel</Text>
        </TouchableOpacity>
      ),
      headerRight: () => (
        <Button
          color="#1fa1f1"
          onPress={() => {
            createTweet({
              variables: { text: tweetText, type: TweetType.REGULAR },
              refetchQueries: [
                {
                  query: GET_PROFILE_FEED_QUERY,
                  variables: {
                    userId: data.me.ID,
                  },
                },
              ],
            })
            navigation.replace(route.params.previousScreen)
          }}
          title="Tweet"
        />
      ),
    })
  }, [navigation, createTweet, tweetText, data])

  return (
    <>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          paddingVertical: 10,
          paddingHorizontal: 20,
        }}
      >
        <Image
          style={{ borderRadius: 100, height: 35, width: 35 }}
          source={{
            uri: 'https://pbs.twimg.com/profile_images/1262355025642377217/6wsNYkkv_400x400.jpg',
          }}
        />
        <TextInput
          autoFocus
          multiline
          onChangeText={(text) => setTweet(text)}
          placeholder="What's happening?"
          placeholderTextColor="darkgrey"
          style={{ flexShrink: 1, fontSize: 16, paddingLeft: 20 }}
          value={tweetText}
        />
      </View>
    </>
  )
}
