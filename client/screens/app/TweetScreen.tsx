import { DrawerNavigationProp } from '@react-navigation/drawer'
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack/lib/typescript/src/types'
import * as React from 'react'
import { Text, Button, Image, TextInput, View, TouchableOpacity } from 'react-native'
import { DrawerParamList, HomeStackParamList } from '../../types'

type TweetScreenNavigationProp = CompositeNavigationProp<
  DrawerNavigationProp<DrawerParamList>,
  StackNavigationProp<HomeStackParamList, 'Tweet'>
>
type TweetScreenRouteProp = RouteProp<HomeStackParamList, 'Tweet'>

interface Props {
  navigation: TweetScreenNavigationProp
  route: TweetScreenRouteProp
}

export const TweetScreen = ({ navigation, route }: Props) => {
  React.useLayoutEffect(() => {
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
          accessibilityLabel="Learn more about this purple button"
          color="#1fa1f1"
          onPress={() => navigation.replace('Feed')}
          title="Tweet"
        />
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
