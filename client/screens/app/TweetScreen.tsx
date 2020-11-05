import { StackNavigationProp } from '@react-navigation/stack'
import * as React from 'react'
import { Button, Image, TextInput, View } from 'react-native'
import { HomeParamList } from '../../types'

type TweetScreenNavigationProp = StackNavigationProp<HomeParamList, 'Tweet'>

interface Props {
  navigation: TweetScreenNavigationProp
}

export const TweetScreen = ({ navigation }: Props) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button color="#1fa1f1" onPress={() => navigation.push('Feed')} title="Tweet" />
      ),
    })
  }, [navigation])

  const [tweet, setTweet] = React.useState('')

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
          autoFocus={true}
          multiline={true}
          onChangeText={(text) => setTweet(text)}
          placeholder="What's happening?"
          placeholderTextColor="darkgrey"
          style={{ flexShrink: 1, fontSize: 16, paddingLeft: 20 }}
          value={tweet}
        />
      </View>
    </>
  )
}
