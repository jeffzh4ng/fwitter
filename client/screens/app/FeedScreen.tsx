import * as React from 'react'
import { FlatList, SafeAreaView, StyleSheet, Image, Text, View, Pressable } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { DrawerParamList } from '../../types'
import { gql, useMutation, useQuery } from '@apollo/client'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { ME_MUTATION } from '../../mutations'
import { LoginData } from '../../__generated__/LoginData'
import { FeedData, FeedData_getFeed } from '../../__generated__/FeedData'
import { ListOfTweets } from '../../components/ListOfTweets'

type FeedScreenNavigationProp = StackNavigationProp<DrawerParamList, 'Root'>

interface Props {
  navigation: FeedScreenNavigationProp
}

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

const GET_FEED_QUERY = gql`
  query FeedData {
    getFeed {
      ID
      text
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

export const FeedScreen = ({ navigation }: Props) => {
  const { error, data } = useQuery<FeedData>(GET_FEED_QUERY)

  const renderTweet = ({ item }: { item: FeedData_getFeed }) => {
    return <Tweet tweet={item} />
  }

  if (!data) return <Text>Loading</Text>

  const handleOnTweet = () => {}
  const handleOnLike = () => {}

  return (
    <ListOfTweets tweets={data.getFeed} handleOnTweet={handleOnTweet} handleOnLike={handleOnLike} />
  )
}

const styles = StyleSheet.create({
  home: {
    backgroundColor: '#fff',
    height: '100%',
  },
})
