import * as React from 'react'
import { SafeAreaView, Image, Text, View, Pressable } from 'react-native'
import { HomeStackParamList } from '../../../types'
import { AntDesign, Entypo } from '@expo/vector-icons'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { Tweets } from './Tweets'
import { TweetsAndReplies } from './TweetsAndReplies'
import { Media } from './Media'
import { Likes } from './Likes'
import { RouteProp } from '@react-navigation/native'

type ProfileScreenRouteProp = RouteProp<HomeStackParamList, 'Profile'>

export interface ProfileScreenProps {
  userId: string
}

interface Props {
  route: ProfileScreenRouteProp
}

const Tab = createMaterialTopTabNavigator()

export const ProfileScreen = ({ route }: Props) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <>
        <Image
          style={{ borderRadius: 100, height: 50, width: 50 }}
          source={{
            uri: 'https://pbs.twimg.com/profile_images/1323674642205315072/YoTHCtRr_400x400.jpg',
          }}
        />
        <Pressable>
          <Text>Edit Profile</Text>
        </Pressable>
        <Text>Jeff</Text>
        <Text>@jeffzh4ng</Text>
        <Text>incoming @tesla, math @uwaterloo</Text>
        <Text>
          <Entypo name="link" size={15} color="black" />
          jeffzh4ng.com
        </Text>
        <Text>
          <AntDesign name="calendar" size={15} color="black" />
          Joined April 2020
        </Text>
        <Text>141 Following</Text>
        <Text>140 Followers</Text>
      </>

      <Tab.Navigator initialRouteName="Tweets" tabBar={() => <View />}>
        <Tab.Screen
          name="Tweets"
          component={Tweets}
          initialParams={{ userId: route.params.userId }}
        />
        <Tab.Screen name="Tweets and replies" component={TweetsAndReplies} />
        <Tab.Screen name="Media" component={Media} />
        <Tab.Screen name="Likes" component={Likes} />
      </Tab.Navigator>
    </SafeAreaView>
  )
}
