import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native'
import * as React from 'react'
import { Image, ColorSchemeName, Pressable, NativeModules, View } from 'react-native'

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
} from '@react-navigation/drawer'
import { meData, meData_me } from '../__generated__/meData'
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
      {data ? <DrawerNavigator user={data.me} /> : <UnauthenticatedStack />}
    </NavigationContainer>
  )
}

const Drawer = createDrawerNavigator()

const DrawerNavigator = ({ user }: { user: meData_me }) => {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} user={user} />}>
      <Drawer.Screen name="Home" component={BottomTabNavigator} />
    </Drawer.Navigator>
  )
}

const DrawerContent = (props: DrawerContentComponentProps & { user: meData_me }) => {
  return (
    <>
      <DrawerContentScrollView>
        <View style={{ marginLeft: 15 }}>
          <Image
            style={{ borderRadius: 100, height: 50, marginTop: 10, width: 50 }}
            source={{
              uri: 'https://pbs.twimg.com/profile_images/1323674642205315072/YoTHCtRr_400x400.jpg',
            }}
          />

          <Text style={{ fontSize: 20, fontWeight: '700' }}>{props.user.name}</Text>
          <Text style={{ color: 'darkslategrey', marginTop: 2 }}>@{props.user.username}</Text>

          <View style={{ flexDirection: 'row', marginTop: 20 }}>
            <Text>
              <Text style={{ fontWeight: '700' }}>{props.user.following.length} </Text> Following
            </Text>
            <Text style={{ marginLeft: 15 }}>
              <Text style={{ fontWeight: '700' }}>{props.user.followers.length}</Text> Followers
            </Text>
          </View>
        </View>

        <DrawerItem
          label="Profile"
          onPress={() => {
            props.navigation.navigate('Profile', { userId: props.user.ID })
          }}
        />
        {/* <Pressable
          onPress={() => {
            console.log(NativeModules.Networking)
          }}
        >
          <Text>Logout</Text>
        </Pressable> */}
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
