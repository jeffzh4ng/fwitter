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
import { AntDesign } from '@expo/vector-icons'

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
      {data ? <DrawerNavigator userId={data.me.ID} /> : <UnauthenticatedStack />}
    </NavigationContainer>
  )
}

const Drawer = createDrawerNavigator()

const DrawerNavigator = ({ userId }: { userId: string }) => {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} userId={userId} />}>
      <Drawer.Screen name="Home" component={BottomTabNavigator} />
    </Drawer.Navigator>
  )
}

const DrawerContent = (props: DrawerContentComponentProps & { userId: string }) => {
  return (
    <>
      <DrawerContentScrollView>
        <DrawerItemList {...props} />
        <DrawerItem
          label="Profile"
          onPress={() => {
            props.navigation.navigate('Profile', { userId: props.userId })
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
      <Root.Screen
        name="Landing"
        component={LandingScreen}
        options={{ headerTitle: () => <AntDesign name="twitter" size={24} color="#1fa1fa" /> }}
      />
      <Root.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ headerTitle: () => <AntDesign name="twitter" size={24} color="#1fa1fa" /> }}
      />
      <Root.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerTitle: () => <AntDesign name="twitter" size={24} color="#1fa1fa" /> }}
      />
      <Root.Screen
        name="Verify"
        component={VerifyScreen}
        options={{ headerTitle: () => <AntDesign name="twitter" size={24} color="#1fa1fa" /> }}
      />
      <Root.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{ headerTitle: () => <AntDesign name="twitter" size={24} color="#1fa1fa" /> }}
      />
    </Root.Navigator>
  )
}
