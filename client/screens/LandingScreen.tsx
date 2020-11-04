import { Link } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import * as React from 'react'
import { Pressable, SafeAreaView, Text, View } from 'react-native'
import { Icon } from 'react-native-elements'
import { RootStackParamList } from '../types'

type LandingScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>

interface Props {
  navigation: LandingScreenNavigationProp
}

const LandingScreen = ({ navigation }: Props) => {
  return (
    <SafeAreaView>
      <View style={{ height: '100%', justifyContent: 'space-between', paddingHorizontal: 40 }}>
        <Icon name="twitter" type="font-awesome-5" color="#1fa1f1" />

        <View>
          <Text style={{ fontSize: 25, fontWeight: '700', width: 200 }}>
            See what's happening in the world right now.
          </Text>
          <Pressable
            style={({ pressed }) => [
              {
                alignItems: 'center',
                backgroundColor: pressed ? '#198fd3' : '#1fa1f1',
                borderRadius: 100,
                justifyContent: 'center',
                marginTop: 30,
                height: 45,
              },
            ]}
            onPress={() => {
              navigation.navigate('SignUp')
            }}
          >
            <Text style={{ color: 'white', fontSize: 17, fontWeight: '700' }}>Create account</Text>
          </Pressable>
        </View>

        <Text>
          Have an account already? <Link to="/login">Log in</Link>
        </Text>
      </View>
    </SafeAreaView>
  )
}

export default LandingScreen
