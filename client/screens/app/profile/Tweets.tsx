import { MaterialCommunityIcons } from '@expo/vector-icons'
import { StackNavigationProp } from '@react-navigation/stack'
import * as React from 'react'
import { SafeAreaView, Text, View, Image, FlatList, Pressable } from 'react-native'
import { DrawerParamList } from '../../../types'

interface Tweet {
  id: string
  name: string
  userName: string
  avatarUrl: string
  text: string
  replies: Array<string>
  retweets: Array<string>
  likes: Array<string>
  time: string
}

const tweets: Array<Tweet> = [
  {
    id: '0',
    name: 'Jeff',
    userName: 'jeffzh4ng',
    avatarUrl: 'https://pbs.twimg.com/profile_images/1323674642205315072/YoTHCtRr_400x400.jpg',
    text:
      '"It is not things themselves that trouble people, but their opinions about things. Death, for instance, is nothing terrible, but the terrible thing is the opinion that death is terrible." #5 from the Enchiridion of Epictetus',
    replies: [],
    retweets: ['leo123', 'juliarocks', 'alexaxD'],
    likes: ['danielsan', 'tannerthewhiteguy'],
    time: '4m',
  },
  {
    id: '1',
    name: 'Sean',
    userName: 'swyx',
    avatarUrl: 'https://pbs.twimg.com/profile_images/1201029434054041606/efWs7Lr9_400x400.jpg',
    text:
      'Tribal thinkers are civil at best and spiteful at worst when dealing with other tribes. But they can be downright disingenuous and demonizing when facing independent thinkers.',
    replies: [],
    retweets: ['leo123', 'juliarocks', 'alexaxD'],
    likes: ['danielsan', 'tannerthewhiteguy'],
    time: '4m',
  },
  {
    id: '2',
    name: 'Lex Fridman',
    userName: 'lexfridman',
    avatarUrl: 'https://pbs.twimg.com/profile_images/956331551435960322/OaqR8pAB_400x400.jpg',
    text:
      'Reading about Jeffrey Epstein and Ghislaine Maxwell taught me less about the capacity for evil in individuals and more about the weakness of institutions in the face of evil.',
    replies: [],
    retweets: ['leo123', 'juliarocks', 'alexaxD'],
    likes: ['danielsan', 'tannerthewhiteguy'],
    time: '4m',
  },
  {
    id: '3',
    name: 'Jay Patel',
    userName: '__somekid',
    avatarUrl: 'https://pbs.twimg.com/profile_images/1314685714404122624/TrscLpQX_400x400.jpg',
    text:
      'Yeah it’s like how do you stay motivated about future outcomes without having expectations for them. Eudaemonia (sustained & balanced happiness/resilience) is tough, but imo you can develop habits and thinking patterns to help...',
    replies: [],
    retweets: ['leo123', 'juliarocks', 'alexaxD'],
    likes: ['danielsan', 'tannerthewhiteguy'],
    time: '4m',
  },
  {
    id: '4',
    name: 'Sean',
    userName: 'swyx',
    avatarUrl: 'https://pbs.twimg.com/profile_images/1201029434054041606/efWs7Lr9_400x400.jpg',
    text:
      'This is my stage of learning of AWS right now god i need everything to pause for a year so i can just learn this stuff without anything new happening ever',
    replies: [],
    retweets: ['leo123', 'juliarocks', 'alexaxD'],
    likes: ['danielsan', 'tannerthewhiteguy'],
    time: '4m',
  },
]

type ProfileScreenNavigationProp = StackNavigationProp<DrawerParamList, 'Profile'>

interface Props {
  navigation: ProfileScreenNavigationProp
}

export const Tweets = ({ navigation }: Props) => {
  const renderTweet = ({ item }: { item: Tweet }) => {
    return <Tweet tweet={item} />
  }

  return (
    <SafeAreaView>
      <FlatList data={tweets} renderItem={renderTweet} keyExtractor={(item) => item.id} />
      <View style={{ backgroundColor: 'transparent', bottom: 15, position: 'absolute', right: 15 }}>
        <Pressable
          style={{ backgroundColor: '#1fa1fa', borderRadius: 100, padding: 15 }}
          onPress={() => navigation.replace('Tweet', { previousScreen: 'Profile' })}
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
            uri: tweet.avatarUrl,
          }}
        />
      </View>
      <View style={{ flexShrink: 1, marginLeft: 10 }}>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <Text style={{ fontSize: 16, fontWeight: '700' }}>{tweet.name}</Text>
          <Text style={{ fontSize: 16, marginLeft: 3 }}>@{tweet.userName}</Text>
          <Text style={{ fontSize: 16, marginLeft: 3 }}>• {tweet.time}</Text>
        </View>
        <Text style={{ flexShrink: 1, fontSize: 16 }}>{tweet.text}</Text>
      </View>
    </View>
  )
}
