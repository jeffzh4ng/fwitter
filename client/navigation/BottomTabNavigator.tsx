import { AntDesign, Feather } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack'
import * as React from 'react'
import { Text } from 'react-native'
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
  FocusedTweetScreen,
  SearchResultScreen,
  EditProfileScreen,
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
        component={SearchNavigator}
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
        options={{
          headerTitle: () => <AntDesign name="twitter" size={24} color="#1fa1fa" />,
          headerLeft: () => null,
          animationEnabled: false,
        }}
      />
      <HomeStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerTitle: 'Profile', headerLeft: () => null }}
        // TODO: initial params should be your own user Id
        initialParams={{ userId: 'e2a85941-ef87-442f-be1c-7a0d3c18cfb1' }}
      />
      <HomeStack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{
          headerBackTitle: 'Cancel',
          headerTitle: () => <Text style={{ fontSize: 18, fontWeight: '700' }}>Edit profile</Text>,
        }}
      />
      <HomeStack.Screen name="CreateTweet" component={CreateTweetScreen} />
      <HomeStack.Screen
        name="FocusedTweet"
        component={FocusedTweetScreen}
        options={{ headerBackTitle: ' ', headerTitle: 'Tweet' }}
      />
    </HomeStack.Navigator>
  )
}

const SearchStack = createStackNavigator()
const SearchNavigator = () => {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen name="Search" component={SearchScreen} />
      <SearchStack.Screen
        name="SearchResult"
        component={SearchResultScreen}
        options={{
          headerBackTitle: ' ',
        }}
      />
    </SearchStack.Navigator>
  )
}
