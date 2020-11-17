import { StackNavigationProp } from '@react-navigation/stack'
import * as React from 'react'
import { SafeAreaView, Image, Text, TextInput, View, Pressable } from 'react-native'
import { HomeStackParamList } from '../../types'

type EditProfileScreenNavigationPropl = StackNavigationProp<HomeStackParamList, 'Feed'>

interface Props {
  navigation: EditProfileScreenNavigationPropl
}

export const EditProfileScreen = ({ navigation }: Props) => {
  const [name, setName] = React.useState('Jeff')
  const [bio, setBio] = React.useState('math @uwaterloo')
  const [website, setWebsite] = React.useState('jeffzh4ng.com')

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable style={{ marginRight: 10 }} onPress={() => {}}>
          <Text style={{ color: '#1fa1fa', fontWeight: '600', fontSize: 18, marginRight: 10 }}>
            Save
          </Text>
        </Pressable>
      ),
    })
  }, [navigation])

  return (
    <SafeAreaView>
      <View>
        <Image
          style={{ borderRadius: 100, height: 50, marginLeft: 15, marginTop: 15, width: 50 }}
          source={{
            uri: 'https://pbs.twimg.com/profile_images/1323674642205315072/YoTHCtRr_400x400.jpg',
          }}
        />

        <View
          style={{
            flexDirection: 'row',
            marginVertical: 8,
            borderColor: '#eee',
            borderBottomWidth: 1,
            borderTopWidth: 1,
            marginTop: 20,
          }}
        >
          <Text style={{ fontWeight: '600', marginLeft: 15 }}>Name</Text>
          <TextInput
            onChangeText={(text) => setName(text)}
            style={{ color: '#1fa1fa', flexShrink: 1, fontSize: 16, paddingLeft: 20 }}
            value={name}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            height: 70,
            marginVertical: 8,
            borderBottomColor: '#eee',
            borderBottomWidth: 1,
          }}
        >
          <Text style={{ fontWeight: '600', marginLeft: 15 }}>Bio</Text>
          <TextInput
            multiline
            onChangeText={(text) => setBio(text)}
            style={{ color: '#1fa1fa', flexShrink: 1, fontSize: 16, paddingLeft: 20 }}
            value={bio}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginVertical: 8,
            borderBottomColor: '#eee',
            borderBottomWidth: 1,
          }}
        >
          <Text style={{ fontWeight: '600', marginLeft: 15 }}>Website</Text>
          <TextInput
            onChangeText={(text) => setWebsite(text)}
            style={{ color: '#1fa1fa', flexShrink: 1, fontSize: 16, paddingLeft: 20 }}
            value={website}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}
