import * as React from 'react'
import { FlatList, SafeAreaView, StyleSheet, Image, Text, View, Pressable } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import moment from 'moment'

interface Tweet {
  id: string
  name: string
  username: string
  avatarUrl: string
  text: string
  replies: Array<string>
  retweets: Array<string>
  likes: Array<string>
  createdAt: string
}

interface Props {
  onTweet: () => void
  tweets: Array<Tweet>
}

export const ListOfTweets = ({ tweets, onTweet }: Props) => {
  const renderTweet = ({ item }: { item: Tweet }) => {
    return <Tweet tweet={item} />
  }

  return (
    <SafeAreaView style={styles.home}>
      <FlatList data={tweets} renderItem={renderTweet} keyExtractor={(item) => item.id} />
      <View style={{ backgroundColor: 'transparent', bottom: 15, position: 'absolute', right: 15 }}>
        <Pressable
          style={{ backgroundColor: '#1fa1fa', borderRadius: 100, padding: 15 }}
          onPress={onTweet}
        >
          <MaterialCommunityIcons name="feather" size={24} color="white" />
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

const Tweet = (props: { tweet: Tweet }) => {
  const { tweet } = props

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 20,
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
          <Text style={{ fontSize: 16, fontWeight: '700' }}>{tweet.name}</Text>
          <Text style={{ fontSize: 16, marginLeft: 3 }}>@{tweet.username}</Text>
          <Text style={{ fontSize: 16, marginLeft: 3 }}>• {moment(tweet.createdAt).fromNow()}</Text>
        </View>
        <Text style={{ flexShrink: 1, fontSize: 16 }}>{tweet.text}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  home: {
    backgroundColor: '#fff',
    height: '100%',
  },
})
