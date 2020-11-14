import * as React from 'react'
import { FlatList, SafeAreaView, StyleSheet, Image, Text, View, Pressable } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import moment from 'moment'
import { ProfileFeedData_getProfileFeed } from '../__generated__/ProfileFeedData'
import { AntDesign } from '@expo/vector-icons'

interface Props {
  handleOnTweet: () => void
  handleOnLike: (tweetId: string) => void
  tweets: Array<ProfileFeedData_getProfileFeed>
}

export const ListOfTweets = ({ tweets, handleOnTweet, handleOnLike }: Props) => {
  const renderTweet = ({ item }: { item: ProfileFeedData_getProfileFeed }) => {
    return <Tweet tweet={item} handleOnLike={handleOnLike} />
  }

  return (
    <SafeAreaView style={styles.home}>
      <FlatList data={tweets} renderItem={renderTweet} keyExtractor={(item) => item.ID} />
      <View style={{ backgroundColor: 'transparent', bottom: 15, position: 'absolute', right: 15 }}>
        <Pressable
          style={{ backgroundColor: '#1fa1fa', borderRadius: 100, padding: 15 }}
          onPress={handleOnTweet}
        >
          <MaterialCommunityIcons name="feather" size={24} color="white" />
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

const Tweet = (props: {
  tweet: ProfileFeedData_getProfileFeed
  handleOnLike: (tweetId: string) => void
}) => {
  const { tweet } = props

  return (
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
          <Text style={{ fontSize: 16, fontWeight: '700' }}>John Doe</Text>
          <Text style={{ fontSize: 16, marginLeft: 3 }}>@{tweet.user.username}</Text>
          <Text style={{ fontSize: 16, marginLeft: 3 }}>• {moment(tweet.createdAt).fromNow()}</Text>
        </View>
        <Text style={{ flexShrink: 1, fontSize: 16 }}>{tweet.text}</Text>

        <View style={{ flexDirection: 'row' }}>
          <Pressable onPress={() => props.handleOnLike(tweet.ID)}>
            <AntDesign name="hearto" size={17} color="#6A7A89" />
          </Pressable>
          <Text style={{ marginLeft: 3 }}>{tweet.likes.length}</Text>
        </View>
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
