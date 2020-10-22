import * as React from 'react';
import { FlatList, SafeAreaView, StyleSheet, Image } from 'react-native';

import { Text, View } from '../components/Themed';

interface Tweet {
  id: string,
  name: string,
  userName: string,
  avatarUrl: string,
  text: string,
  replies: Array<string>,
  retweets: Array<string>,
  likes: Array<string>,
  time: string
}

export default function TabOneScreen() {
  const tweets: Array<Tweet> = [
    {
      id: '0',
      name: 'Jeff',
      userName: 'jeffzh4ng',
      avatarUrl: 'https://pbs.twimg.com/profile_images/1262355025642377217/6wsNYkkv_400x400.jpg',
      text: '"It is not things themselves that trouble people, but their opinions about things. Death, for instance, is nothing terrible, but the terrible thing is the opinion that death is terrible." #5 from the Enchiridion of Epictetus',
      replies: [],
      retweets: ['leo123', 'juliarocks', 'alexaxD'],
      likes: ['danielsan', 'tannerthewhiteguy'],
      time: '4m'
    },
    {
      id: '1',
      name: 'Sean',
      userName: 'swyx',
      avatarUrl: 'https://pbs.twimg.com/profile_images/1201029434054041606/efWs7Lr9_400x400.jpg',
      text: 'Tribal thinkers are civil at best and spiteful at worst when dealing with other tribes. But they can be downright disingenuous and demonizing when facing independent thinkers.',
      replies: [],
      retweets: ['leo123', 'juliarocks', 'alexaxD'],
      likes: ['danielsan', 'tannerthewhiteguy'],
      time: '4m'
    },
    {
      id: '2',
      name: 'Lex Fridman',
      userName: 'lexfridman',
      avatarUrl: 'https://pbs.twimg.com/profile_images/956331551435960322/OaqR8pAB_400x400.jpg',
      text: 'Reading about Jeffrey Epstein and Ghislaine Maxwell taught me less about the capacity for evil in individuals and more about the weakness of institutions in the face of evil.',
      replies: [],
      retweets: ['leo123', 'juliarocks', 'alexaxD'],
      likes: ['danielsan', 'tannerthewhiteguy'],
      time: '4m'
    }
  ]

  const renderTweet = ({ item }: { item: Tweet}) => {
    return <Tweet tweet={item} />
  }

  return (
    <SafeAreaView style={styles.home}>
      <FlatList
        data={tweets}
        renderItem={renderTweet}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}

const Tweet = (props: { tweet: Tweet }) => {
  const { tweet } = props

  return (
    <View style={{ display: 'flex',  flexDirection: 'row', borderBottomColor: '#eee', borderBottomWidth: 1, paddingVertical: 10, paddingHorizontal: 20}}>
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
        <Text style={{ flexShrink: 1,  fontSize: 16 }}>{tweet.text}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  home: {
    backgroundColor: '#fff',
    height: '100%'
  },
});
