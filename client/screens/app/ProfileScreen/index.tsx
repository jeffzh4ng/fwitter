import * as React from 'react'
import { SafeAreaView, Image, Text, View, Pressable, Linking } from 'react-native'
import { HomeStackParamList } from '../../../types'
import { AntDesign, Entypo } from '@expo/vector-icons'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { Tweets } from './Tweets'
import { TweetsAndReplies } from './TweetsAndReplies'
import { Media } from './Media'
import { Likes } from './Likes'
import { RouteProp } from '@react-navigation/native'
import { gql, useMutation, useQuery } from '@apollo/client'
import { StackNavigationProp } from '@react-navigation/stack'
import { ME_MUTATION } from '../../../mutations'
import { meData } from '../../../__generated__/meData'
import { ProfileData } from '../../../__generated__/ProfileData'
import moment from 'moment'

type ProfileScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'Feed'>
type ProfileScreenRouteProp = RouteProp<HomeStackParamList, 'Profile'>

export interface ProfileScreenProps {
  userId: string
}

interface Props {
  navigation: ProfileScreenNavigationProp
  route: ProfileScreenRouteProp
}

const FOLLOW_MUTATION = gql`
  mutation FollowData($targetId: ID!) {
    follow(targetId: $targetId) {
      ID
    }
  }
`

export const FIND_ONE_USER = gql`
  query ProfileData($userId: ID!) {
    getOneByUserId(userId: $userId) {
      ID
      name
      username
      bio
      website
      createdAt
      followers {
        ID
      }
      following {
        ID
      }
    }
  }
`

const Tab = createMaterialTopTabNavigator()

export const ProfileScreen = ({ navigation, route }: Props) => {
  const [follow] = useMutation(FOLLOW_MUTATION)
  const [me, { data: meDataResult }] = useMutation<meData>(ME_MUTATION)
  const { error, data: profileData } = useQuery<ProfileData>(FIND_ONE_USER, {
    variables: {
      userId: route.params.userId,
    },
  })

  React.useEffect(() => {
    me()
  }, [])

  const followCallback = React.useCallback(() => {
    follow({
      variables: {
        targetId: route.params.userId,
      },
    })
  }, [route.params.userId])

  if (!meDataResult) return <Text>Loading</Text>
  const myUserId = meDataResult.me.ID
  const isMyProfile = route.params.userId === myUserId

  if (!profileData) return <Text>Loading</Text>

  const profile = profileData.getOneByUserId

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ marginHorizontal: 10 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 25 }}>
          <Image
            style={{ borderRadius: 100, height: 50, width: 50 }}
            source={{
              uri: 'https://pbs.twimg.com/profile_images/1323674642205315072/YoTHCtRr_400x400.jpg',
            }}
          />

          {isMyProfile && (
            <Pressable
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? 'lightblue' : null,
                  borderColor: '#1fa1fa',
                  borderRadius: 100,
                  borderWidth: 1,
                  height: '60%',
                  marginRight: 10,
                  padding: 6,
                },
              ]}
              onPress={() => {
                navigation.navigate('EditProfile')
              }}
            >
              <Text style={{ color: '#1fa1fa' }}>Edit Profile</Text>
            </Pressable>
          )}
        </View>

        {/* <Pressable onPress={followCallback}>
          <Text>Follow</Text>
        </Pressable> */}
        <Text style={{ fontSize: 20, fontWeight: '700', marginTop: 5 }}>{profile.name}</Text>
        <Text style={{ color: 'darkslategrey', marginTop: 2 }}>@{profile.username}</Text>

        <Text style={{ marginTop: 10 }}>{profile.bio} </Text>

        <View style={{ flexDirection: 'row', marginTop: 10 }}>
          <Text
            style={{ color: '#1fa1fa' }}
            onPress={() => {
              if (profile.website) Linking.openURL(profile.website)
            }}
          >
            <Entypo name="link" size={15} color="darkslategrey" />
            {profile.website}
          </Text>

          <Text style={{ color: 'darkslategrey', marginLeft: 15 }}>
            <AntDesign name="calendar" size={18} color="darkslategrey" />
            <Text>{moment(profile.createdAt).format('MMMM YYYY')}</Text>
          </Text>
        </View>

        <View style={{ flexDirection: 'row', marginTop: 8 }}>
          <Text>
            <Text style={{ fontWeight: '700' }}>{profile.following.length} </Text> Following
          </Text>
          <Text style={{ marginLeft: 15 }}>
            <Text style={{ fontWeight: '700' }}>{profile.followers.length}</Text> Followers
          </Text>
        </View>
      </View>

      <Tab.Navigator initialRouteName="Tweets" tabBar={() => <View />}>
        <Tab.Screen
          name="Tweets"
          component={Tweets}
          initialParams={{ userId: route.params.userId }}
        />
        <Tab.Screen name="Tweets and replies" component={TweetsAndReplies} />
        <Tab.Screen name="Media" component={Media} />
        <Tab.Screen name="Likes" component={Likes} />
      </Tab.Navigator>
    </SafeAreaView>
  )
}
