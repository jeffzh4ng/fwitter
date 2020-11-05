import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import * as React from 'react'
import { ColorSchemeName } from 'react-native'

import NotFoundScreen from '../screens/NotFoundScreen'
import { RootStackParamList } from '../types'
import BottomTabNavigator from './BottomTabNavigator'
import LinkingConfiguration from './LinkingConfiguration'
import { currentUserVar } from '../cache'
import { LandingScreen, LoginScreen, SignUpScreen, VerifyScreen } from '../screens/onboarding'

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

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {currentUser ? (
        <Stack.Screen name="Root" component={BottomTabNavigator} />
      ) : (
        <UnauthenticatedStack />
      )}

      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  )
}

const UnauthenticatedStack = () => {
  const isSignout = false

  return (
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
  )
}
