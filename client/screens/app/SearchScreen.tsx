import { gql, useLazyQuery } from '@apollo/client'
import * as React from 'react'
import { SafeAreaView, TextInput } from 'react-native'
import { Text } from 'react-native'
import { UserSearchListResult } from '../../__generated__/UserSearchListResult'

const GET_MANY_BY_USERNAME_QUERY = gql`
  query UserSearchListResult($query: String!) {
    getManyByUsername(query: $query) {
      ID
      username
    }
  }
`

export const SearchScreen = () => {
  const [searchText, setSearchText] = React.useState('')
  const [getManyByUsername, { data }] = useLazyQuery<UserSearchListResult>(
    GET_MANY_BY_USERNAME_QUERY
  )

  const recentSearches = null
  const users = data?.getManyByUsername

  console.log(users)

  React.useEffect(() => {
    getManyByUsername({ variables: { query: searchText } })
  }, [searchText])

  return (
    <SafeAreaView>
      <TextInput
        onChangeText={(text) => setSearchText(text)}
        placeholder="Search Twitter"
        placeholderTextColor="darkgrey"
        style={{ flexShrink: 1, fontSize: 16, paddingLeft: 20 }}
        value={searchText}
      />
      {recentSearches ? (
        <Text>Recent Searches</Text>
      ) : (
        <Text>Try searching for people, topics, or keywords</Text>
      )}
      {users ? users.map((user) => <Text>{user.username}</Text>) : null}
    </SafeAreaView>
  )
}
