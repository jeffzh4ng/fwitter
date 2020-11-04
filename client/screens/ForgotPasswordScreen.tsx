import * as React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Pressable, Text, TextInput, View } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../types'

type ForgotPasswordScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ForgotPassword'>

interface Props {
  navigation: ForgotPasswordScreenNavigationProp
}

const ForgotPasswordScreen = ({ navigation }: Props) => {
  const [emailOrUsername, onChangeEmailOrUsername] = React.useState('')

  return (
    <SafeAreaView>
      <View style={{ paddingLeft: 15 }}>
        <Text style={{ fontSize: 23, fontWeight: '700', marginTop: 50 }}>
          Find your Twitter account
        </Text>
        <Text style={{ fontSize: 15, marginTop: 15 }}>Enter your email or username.</Text>

        <TextInput
          autoFocus
          style={{
            borderColor: '#1fa1fa',
            borderRadius: 100,
            borderWidth: 0.5,
            color: '#1fa1fa',
            fontSize: 16,
            height: 30,
            marginTop: 20,
            paddingLeft: 10,
            width: 250,
          }}
          autoCapitalize="none"
          onChangeText={(text) => onChangeEmailOrUsername(text)}
          placeholder=""
          placeholderTextColor="lightslategrey"
          value={emailOrUsername}
        />

        <Pressable
          style={({ pressed }) => [
            {
              alignItems: 'center',
              backgroundColor: pressed ? '#198fd3' : '#1fa1f1',
              borderRadius: 100,
              height: 35,
              justifyContent: 'center',
              marginTop: 25,
              width: 80,
            },
          ]}
          onPress={() => {
            navigation.navigate('Verify')
          }}
        >
          <Text style={{ color: 'white', fontSize: 15, fontWeight: '700' }}>Search</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

export default ForgotPasswordScreen
