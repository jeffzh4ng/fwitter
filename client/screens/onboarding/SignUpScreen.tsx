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
import { RootStackParamList } from '../../types'

type SignUpScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignUp'>

interface Props {
  navigation: SignUpScreenNavigationProp
}

export const SignUpScreen = ({ navigation }: Props) => {
  const [name, onChangeName] = React.useState('')
  const [email, onChangeEmail] = React.useState('')
  const [birthDate, onChangeBirth] = React.useState('')

  return (
    <SafeAreaView>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView
          style={{ height: '100%', justifyContent: 'space-between' }}
          behavior="padding"
        >
          <View style={{ paddingHorizontal: 40 }}>
            <AntDesign name="twitter" size={24} color="#1fa1fa" />

            <Text style={{ fontSize: 23, fontWeight: '700', marginTop: 50, textAlign: 'center' }}>
              Create your account
            </Text>

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
              onChangeText={(text) => onChangeName(text)}
              placeholder="Name"
              placeholderTextColor="lightslategrey"
              value={name}
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
              autoCapitalize="none"
              onChangeText={(text) => onChangeEmail(text)}
              placeholder="Email"
              placeholderTextColor="lightslategrey"
              value={email}
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
              autoCapitalize="none"
              onChangeText={(text) => onChangeBirth(text)}
              placeholder="Date of birth"
              placeholderTextColor="lightslategrey"
              value={birthDate}
            />
          </View>

          <Pressable
            style={({ pressed }) => [
              {
                alignItems: 'center',
                alignSelf: 'flex-end',
                backgroundColor: pressed ? '#198fd3' : '#1fa1f1',
                borderRadius: 100,
                height: 35,
                justifyContent: 'center',
                marginTop: 30,
                marginRight: 15,
                width: 60,
              },
            ]}
            onPress={() => {
              navigation.navigate('Verify')
            }}
          >
            <Text style={{ color: 'white', fontSize: 15, fontWeight: '700' }}>Next</Text>
          </Pressable>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}
