import { gql, useMutation } from '@apollo/client'
import { AntDesign } from '@expo/vector-icons'
import { StackNavigationProp } from '@react-navigation/stack'
import * as React from 'react'
import {
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { DrawerParamList } from '../../types'

type LoginScreenNavigationProp = StackNavigationProp<DrawerParamList, 'Login'>

interface Props {
  navigation: LoginScreenNavigationProp
}

const LOGIN_MUTATION = gql`
  mutation LoginData($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ID
      username
    }
  }
`

export const LoginScreen = ({ navigation }: Props) => {
  const [emailOrUsername, onChangeEmailOrUsername] = React.useState('')
  const [password, onChangePassword] = React.useState('')
  const [passwordTextSecure, togglePassword] = React.useState(true)

  const [login, { data }] = useMutation(LOGIN_MUTATION)
  if (data) {
    // TODO: somehow reload navigation/index.tsx to reload entire app with authenticated drawer 'stack'
  }

  return (
    <SafeAreaView>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView
          style={{ height: '100%', justifyContent: 'space-between' }}
          behavior="padding"
        >
          <View style={{ paddingHorizontal: 20 }}>
            <Text style={{ fontSize: 23, fontWeight: '700', marginTop: 50, textAlign: 'center' }}>
              Log in to Twitter
            </Text>

            <View>
              <TextInput
                autoFocus
                style={{
                  borderBottomWidth: 0.5,
                  borderBottomColor: 'lightgrey',
                  color: '#1fa1fa',
                  fontSize: 16,
                  height: 30,
                  marginTop: 50,
                  paddingBottom: 15,
                }}
                autoCapitalize="none"
                onChangeText={(text) => onChangeEmailOrUsername(text)}
                placeholder="Email or username"
                placeholderTextColor="lightslategrey"
                value={emailOrUsername}
              />
              <TextInput
                style={{
                  borderBottomWidth: 0.5,
                  borderBottomColor: 'lightgrey',
                  color: '#1fa1fa',
                  fontSize: 16,
                  height: 30,
                  marginTop: 20,
                  paddingBottom: 15,
                }}
                secureTextEntry={passwordTextSecure}
                autoCapitalize="none"
                onChangeText={(text) => onChangePassword(text)}
                placeholder="Password"
                placeholderTextColor="lightslategrey"
                value={password}
              />
            </View>
            <View></View>
            <Pressable onPress={() => togglePassword(!passwordTextSecure)}>
              <Text style={{ color: '#1fa1fa' }}>
                {passwordTextSecure ? 'Show password' : 'Hide password'}
              </Text>
            </Pressable>
          </View>

          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 20,
            }}
          >
            <Pressable
              onPress={() => {
                navigation.navigate('ForgotPassword')
              }}
            >
              <Text style={{ color: '#1fa1f1', fontSize: 15 }}>Forgot password?</Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                {
                  alignItems: 'center',
                  backgroundColor: pressed ? '#198fd3' : '#1fa1f1',
                  borderRadius: 100,
                  height: 35,
                  justifyContent: 'center',
                  width: 65,
                },
              ]}
              onPress={() => {
                login({ variables: { username: emailOrUsername, password } })
              }}
            >
              <Text style={{ color: 'white', fontSize: 15, fontWeight: '700' }}>Log in</Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}
