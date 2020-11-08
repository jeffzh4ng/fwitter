import { StackNavigationProp } from '@react-navigation/stack'
import * as React from 'react'
import { Pressable, Text, View, SafeAreaView } from 'react-native'
import { DrawerParamList } from '../../types'

type VerifyScreenNavigationProp = StackNavigationProp<DrawerParamList, 'Verify'>

interface Props {
  navigation: VerifyScreenNavigationProp
}

export const VerifyScreen = ({ navigation }: Props) => {
  const email = 'john@doe.com'

  return (
    <SafeAreaView>
      <View style={{ height: '100%', justifyContent: 'space-between' }}>
        <View>
          <Text style={{ fontSize: 23, fontWeight: '700', marginTop: 50, textAlign: 'center' }}>
            We sent you a code
          </Text>

          <Text style={{ color: 'slategrey', fontSize: 15, marginTop: 15, textAlign: 'center' }}>
            Enter it below to verify {email}
          </Text>

          <Text style={{ color: 'slategrey', fontSize: 50, marginTop: 15, textAlign: 'center' }}>
            _ _ _ _ _ _
          </Text>
        </View>

        <View style={{ padding: 15 }}>
          <Pressable
            onPress={() => {
              navigation.navigate('EnterPassword')
            }}
          >
            <Text style={{ color: '#1fa1fa' }}>Didn't receive an email?</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              {
                alignItems: 'center',
                backgroundColor: pressed ? '#198fd3' : '#1fa1f1',
                borderRadius: 100,
                justifyContent: 'center',
                height: 45,
                marginTop: 20,
              },
            ]}
            onPress={() => {
              navigation.navigate('EnterPassword')
            }}
          >
            <Text style={{ color: 'white', fontSize: 17, fontWeight: '700' }}>Next</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  )
}
