import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native'
import * as React from 'react'
import { ColorSchemeName, Pressable, NativeModules } from 'react-native'

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
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer'
import { meData } from '../__generated__/meData'

const Root = createStackNavigator()

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  const [me, { loading, data }] = useMutation<meData>(ME_MUTATION)

  React.useEffect(() => {
    me()
  }, [])

  if (loading) return <Text>Loading</Text>

  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      {data ? <DrawerNavigator /> : <UnauthenticatedStack />}
    </NavigationContainer>
  )
}

const Drawer = createDrawerNavigator()

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={DrawerContent}>
      <Drawer.Screen name="Home" component={BottomTabNavigator} />
    </Drawer.Navigator>
  )
}

const DrawerContent = (props: DrawerContentComponentProps) => {
  return (
    <>
      <DrawerContentScrollView>
        <DrawerItemList {...props} />
        <DrawerItem
          label="Profile"
          onPress={() => {
            props.navigation.navigate('Profile', { userId: '499a10af-f642-487e-97dc-b8875b032fc5' })
          }}
        />
        <Pressable
          onPress={() => {
            console.log(NativeModules.Networking)
          }}
        >
          <Text>Logout</Text>
        </Pressable>
      </DrawerContentScrollView>
    </>
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
