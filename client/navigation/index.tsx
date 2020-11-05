import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import * as React from 'react'
import { ColorSchemeName } from 'react-native'
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen'

import NotFoundScreen from '../screens/NotFoundScreen'
import LandingScreen from '../screens/LandingScreen'
import SignUpScreen from '../screens/SignUpScreen'
import { RootStackParamList } from '../types'
import BottomTabNavigator from './BottomTabNavigator'
import LinkingConfiguration from './LinkingConfiguration'
import VerifyScreen from '../screens/VerifyScreen'
import LoginScreen from '../screens/LoginScreen'
import { currentUserVar } from '../cache'

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  )
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>()

function RootNavigator() {
  const currentUser = currentUserVar()
  const isSignout = false

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!currentUser ? (
        <>
          <Stack.Screen
            name="Landing"
            component={LandingScreen}
            options={{
              title: 'Landing',
              animationTypeForReplace: isSignout ? 'pop' : 'push',
            }}
          />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Verify" component={VerifyScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        </>
      ) : (
        <Stack.Screen name="Root" component={BottomTabNavigator} />
      )}

      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  )
}
