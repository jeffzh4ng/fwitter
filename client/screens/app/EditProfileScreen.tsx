import { gql, useMutation } from '@apollo/client'
import { StackNavigationProp } from '@react-navigation/stack'
import * as React from 'react'
import { SafeAreaView, Image, Text, View, Pressable, TextInput } from 'react-native'
import { ME_MUTATION } from '../../mutations'
import { HomeStackParamList } from '../../types'
import { meData } from '../../__generated__/meData'
import { FIND_ONE_USER } from './ProfileScreen'
import * as ImagePicker from 'expo-image-picker'
import { DEFAULT_AVATAR_URL } from '../../constants'

type EditProfileScreenNavigationPropl = StackNavigationProp<HomeStackParamList, 'Feed'>

interface Props {
  navigation: EditProfileScreenNavigationPropl
}

const UPDATE_USER_MUTATION = gql`
  mutation UpdatedUserData($name: String!, $bio: String!, $website: String!) {
    updateUser(name: $name, bio: $bio, website: $website) {
      ID
      username
      name
      bio
      website
    }
  }
`

export const EditProfileScreen = ({ navigation }: Props) => {
  const [me, { data: meDataResult }] = useMutation<meData>(ME_MUTATION)
  const [updateUser] = useMutation(UPDATE_USER_MUTATION)

  const [name, setName] = React.useState('')
  const [bio, setBio] = React.useState('')
  const [website, setWebsite] = React.useState('')

  React.useEffect(() => {
    me()
  }, [])

  React.useEffect(() => {
    if (!meDataResult) return

    setName(meDataResult.me.name)
    setBio(meDataResult.me.bio || '')
    setWebsite(meDataResult.me.website || '')
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
              refetchQueries: [
                {
                  query: FIND_ONE_USER,
                  variables: {
                    userId: meDataResult?.me.ID,
                  },
                },
              ],
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
  }, [navigation, name, bio, website, meDataResult])

  return (
    <SafeAreaView>
      <View>
        <View style={{ marginLeft: 15, marginTop: 30 }}>
          <ImagePickerComponent originalImageUrl="" />
        </View>
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

const ImagePickerComponent = ({ originalImageUrl }: { originalImageUrl: string }) => {
  const [imageUrl, setImageUrl] = React.useState(
    originalImageUrl.length > 0 ? originalImageUrl : DEFAULT_AVATAR_URL
  )

  const openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync()
    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!')
      return
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      base64: true,
    })
    if (pickerResult.cancelled === true) return

    cloudinairyUpload(pickerResult.base64)
    setImageUrl(pickerResult.uri)
  }

  const cloudinairyUpload = async (base64Img: string | undefined) => {
    if (!base64Img) console.log('undefined image')
    const data = {
      file: base64Img,
      upload_preset: 'insert your upload preset here,within quotations',
    }

    try {
      const res = await fetch('https://api.cloudinary.com/v1_1/jeffzh4ng/image/upload', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      console.log(res)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <View>
      <Pressable onPress={openImagePickerAsync}>
        <Image
          source={{ uri: imageUrl }}
          style={{
            borderRadius: 100,
            height: 50,
            resizeMode: 'contain',
            width: 50,
          }}
        />
      </Pressable>
    </View>
  )
}
