import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native'
import * as React from 'react'
import { ColorSchemeName } from 'react-native'

import BottomTabNavigator from './BottomTabNavigator'
import LinkingConfiguration from './LinkingConfiguration'
import { currentUserVar } from '../cache'
import {
  ForgotPasswordScreen,
  LandingScreen,
  LoginScreen,
  SignUpScreen,
  VerifyScreen,
} from '../screens/onboarding'
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer'
import { createStackNavigator } from '@react-navigation/stack'
import { ProfileScreen } from '../screens/app'

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <DrawerNavigator />
    </NavigationContainer>
  )
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
// const Stack = createStackNavigator<RootStackParamList>()

const Drawer = createDrawerNavigator()

function DrawerNavigator() {
  const currentUser = currentUserVar()
  console.log('current user', currentUser)

  if (true) {
    return (
      <Drawer.Navigator drawerContent={DrawerContent}>
        <Drawer.Screen name="Root" component={BottomTabNavigator} />
      </Drawer.Navigator>
    )
  } else {
    return <UnauthenticatedStack />
  }
}

const DrawerContent = (props: DrawerContentComponentProps) => {
  return (
    <>
      <DrawerContentScrollView>
        <DrawerItemList {...props} />
        <DrawerItem
          label="Profile"
          onPress={() => {
            props.navigation.navigate('Profile')
          }}
        />
      </DrawerContentScrollView>
    </>
  )
}

const UnauthenticatedStack = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Landing" component={LandingScreen} />
      <Drawer.Screen name="SignUp" component={SignUpScreen} />
      <Drawer.Screen name="Login" component={LoginScreen} />
      <Drawer.Screen name="Verify" component={VerifyScreen} />
      <Drawer.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Drawer.Navigator>
  )
}
