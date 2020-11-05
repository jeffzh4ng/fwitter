import { Ionicons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack'
import * as React from 'react'
import { Button, Text, TouchableOpacity } from 'react-native'

import Colors from '../constants/Colors'
import useColorScheme from '../hooks/useColorScheme'
import Feed from '../screens/FeedScreen'
import Tweet from '../screens/Tweet'
import { BottomTabParamList, HomeParamList } from '../types'

const BottomTab = createBottomTabNavigator<BottomTabParamList>()

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme()

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  )
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const HomeStack = createStackNavigator<HomeParamList>()

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
        component={Feed}
        options={{ headerTitle: 'Feed', headerLeft: () => null }}
      />
      <HomeStack.Screen
        name="Tweet"
        component={Tweet}
        options={({ navigation }) => ({
          headerTitle: '',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.push('Home')}>
              <Text style={{ color: '#1FA1F1', fontSize: 16, marginLeft: 10 }}>Cancel</Text>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <Button
              accessibilityLabel="Learn more about this purple button"
              color="#1fa1f1"
              onPress={() => navigation.push('Home')}
              title="Tweet"
            />
          ),
        })}
      />
    </HomeStack.Navigator>
  )
}
