import { gql, useMutation } from '@apollo/client'
import { StackNavigationProp } from '@react-navigation/stack'
import * as React from 'react'
import { SafeAreaView, Image, Text, TextInput, View, Pressable } from 'react-native'
import { ME_MUTATION } from '../../mutations'
import { HomeStackParamList } from '../../types'
import { meData } from '../../__generated__/meData'

type EditProfileScreenNavigationPropl = StackNavigationProp<HomeStackParamList, 'Feed'>

interface Props {
  navigation: EditProfileScreenNavigationPropl
}

const UPDATE_USER_MUTATION = gql`
  mutation UpdatedUserData($name: String!, $bio: String!, $website: String!) {
    updateUser(name: $name, bio: $bio, website: $website) {
      ID
    }
  }
`

export const EditProfileScreen = ({ navigation }: Props) => {
  const [me, { data: meDataResult }] = useMutation<meData>(ME_MUTATION)
  const [updateUser, { data }] = useMutation(UPDATE_USER_MUTATION)

  const [name, setName] = React.useState('')
  const [bio, setBio] = React.useState('')
  const [website, setWebsite] = React.useState('')

  React.useEffect(() => {
    me()
  }, [])

  React.useEffect(() => {
    if (!meDataResult) return

    setName(meDataResult.me.name)
    setBio(meDataResult.me.bio)
    setWebsite(meDataResult.me.website)
  }, [meDataResult])

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          style={{ marginRight: 10 }}
          onPress={() => {
            updateUser({
              variables: {
                name,
                bio,
                website,
              },
            })
            navigation.goBack()
          }}
        >
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
            style={{
              color: '#1fa1fa',
              flexShrink: 1,
              fontSize: 16,
              marginRight: 15,
              paddingLeft: 20,
              width: '100%',
            }}
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
            style={{
              color: '#1fa1fa',
              flexShrink: 1,
              fontSize: 16,
              marginRight: 15,
              paddingLeft: 20,
              width: '100%',
            }}
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
            style={{
              color: '#1fa1fa',
              flexShrink: 1,
              fontSize: 16,
              marginRight: 15,
              paddingLeft: 20,
              width: '100%',
            }}
            value={website}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}
