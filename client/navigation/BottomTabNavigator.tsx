import { AntDesign, Feather } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack'
import * as React from 'react'

import Colors from '../constants/Colors'
import useColorScheme from '../hooks/useColorScheme'
import { BottomTabParamList, HomeStackParamList } from '../types'
import {
  SearchScreen,
  NotificationsScreen,
  MessagesScreen,
  CreateTweetScreen,
  FeedScreen,
  ProfileScreen,
} from '../screens/app'

const BottomTab = createBottomTabNavigator<BottomTabParamList>()

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme()

  return (
    <BottomTab.Navigator
      initialRouteName="Feed"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint, showLabel: false }}
    >
      <BottomTab.Screen
        name="Feed"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => <AntDesign name="home" size={24} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color }) => <AntDesign name="search1" size={24} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          tabBarIcon: ({ color }) => <Feather name="bell" size={24} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Messages"
        component={MessagesScreen}
        options={{
          tabBarIcon: ({ color }) => <AntDesign name="mail" size={24} color={color} />,
        }}
      />
    </BottomTab.Navigator>
  )
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const HomeStack = createStackNavigator<HomeStackParamList>()

function HomeNavigator() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        cardStyle: { backgroundColor: '#fff' },
        cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
      }}
    >
      <HomeStack.Screen
        name="Feed"
        component={FeedScreen}
        options={{ headerTitle: 'Feed', headerLeft: () => null }}
      />
      <HomeStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerTitle: 'Profile', headerLeft: () => null }}
      />
      <HomeStack.Screen name="Tweet" component={CreateTweetScreen} />
    </HomeStack.Navigator>
  )
}
