import { gql, useLazyQuery } from '@apollo/client'
import * as React from 'react'
import {
  FlatList,
  Image,
  ListRenderItemInfo,
  Pressable,
  SafeAreaView,
  TextInput,
  View,
} from 'react-native'
import { Text } from 'react-native'
import colors from '../../constants/Colors'
import { BottomTabParamList, HomeStackParamList } from '../../types'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { CompositeNavigationProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { AntDesign } from '@expo/vector-icons'
import {
  UserSearchData,
  UserSearchData_getManyByUsername,
} from '../../__generated__/UserSearchData'

const GET_MANY_BY_USERNAME_QUERY = gql`
  query UserSearchData($query: String!) {
    getManyByUsername(query: $query) {
      ID
      username
    }
  }
`
type SearchScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabParamList>,
  StackNavigationProp<HomeStackParamList, 'Profile'>
>

interface Props {
  navigation: SearchScreenNavigationProp
}

export const SearchScreen = ({ navigation }: Props) => {
  const [searchText, setSearchText] = React.useState('')
  const [getManyByUsername, { data }] = useLazyQuery<UserSearchData>(GET_MANY_BY_USERNAME_QUERY)

  const recentSearches = null
  const users = data?.getManyByUsername

  const handleUserPress = (userId: string) => {
    navigation.navigate('Feed', {
      screen: 'Profile',
      params: {
        userId,
        screen: 'Tweets',
        params: {
          userId,
        },
      },
    })
  }

  const renderUser = ({ item }: ListRenderItemInfo<UserSearchData_getManyByUsername>) => {
    return <UserSearchResult user={item} handleUserPress={handleUserPress} />
  }

  React.useEffect(() => {
    getManyByUsername({ variables: { query: searchText } })
  }, [searchText])

  return (
    <SafeAreaView style={{ backgroundColor: 'white', height: '100%' }}>
      <View
        style={{
          alignItems: 'center',
          backgroundColor: '#efefef',
          borderRadius: 100,
          flexDirection: 'row',
          marginHorizontal: 10,
        }}
      >
        <AntDesign style={{ marginLeft: 10 }} name="search1" size={20} color="darkslategrey" />
        <TextInput
          autoFocus
          onChangeText={(text) => setSearchText(text)}
          placeholder="Search Twitter"
          placeholderTextColor="#5c6a75"
          style={{
            backgroundColor: '#efefef',
            borderRadius: 100,
            flex: 1,
            fontSize: 16,
            padding: 5,
          }}
          value={searchText}
        />
      </View>
      {recentSearches ? (
        <Text style={{ color: '#5c6a75', marginTop: 10, textAlign: 'center' }}>
          Recent Searches
        </Text>
      ) : (
        <Text style={{ color: '#5c6a75', marginTop: 10, textAlign: 'center' }}>
          Try searching for people, topics, or keywords
        </Text>
      )}
      {users ? (
        <FlatList data={users} renderItem={renderUser} keyExtractor={(user) => user.ID} />
      ) : null}
    </SafeAreaView>
  )
}

const UserSearchResult = ({
  user,
  handleUserPress,
}: {
  user: UserSearchData_getManyByUsername
  handleUserPress: (userId: string) => void
}) => (
  <Pressable
    onPress={() => handleUserPress(user.ID)}
    style={{
      flexDirection: 'row',
      marginLeft: 15,
      marginVertical: 8,
      borderBottomColor: '#eee',
      borderBottomWidth: 1,
    }}
  >
    <Image
      style={{ borderRadius: 100, height: 40, width: 40 }}
      source={{
        uri: 'https://image.flaticon.com/icons/png/512/194/194938.png',
      }}
    />
    <View style={{ marginLeft: 10 }}>
      <Text>Full name here</Text>
      <Text style={{ color: colors.usernameGrey, marginTop: 1 }}>@{user.username}</Text>
    </View>
  </Pressable>
)
