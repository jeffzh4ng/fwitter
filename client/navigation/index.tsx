import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native'
import * as React from 'react'
import { ColorSchemeName } from 'react-native'

import BottomTabNavigator from './BottomTabNavigator'
import LinkingConfiguration from './LinkingConfiguration'
import {
  ForgotPasswordScreen,
  LandingScreen,
  LoginScreen,
  SignUpScreen,
  VerifyScreen,
} from '../screens/onboarding'
import { useMutation } from '@apollo/client'
import { ME_MUTATION } from '../mutations'
import { Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'

const Root = createStackNavigator()

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  const [me, { loading, data }] = useMutation(ME_MUTATION)

  React.useEffect(() => {
    me()
  }, [])

  if (loading) return <Text>Loading</Text>

  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      {data ? <BottomTabNavigator /> : <UnauthenticatedStack />}
    </NavigationContainer>
  )
}

const UnauthenticatedStack = () => {
  return (
    <Root.Navigator>
      <Root.Screen name="Landing" component={LandingScreen} />
      <Root.Screen name="SignUp" component={SignUpScreen} />
      <Root.Screen name="Login" component={LoginScreen} />
      <Root.Screen name="Verify" component={VerifyScreen} />
      <Root.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Root.Navigator>
  )
}
