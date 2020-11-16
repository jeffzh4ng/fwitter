import { gql, useQuery } from '@apollo/client'
import * as React from 'react'
import { SafeAreaView, Text } from 'react-native'

const GET_NOTIFICATIONS_QUERY = gql`
  query NotificationsData {
    getNotifications {
      ID
      createdAt
      type
      target {
        __typename
        ... on Like {
          ID
          user {
            username
          }
          createdAt
        }

        ... on Tweet {
          ID
          text
          user {
            username
          }
        }

        ... on Follow {
          ID
          user {
            username
          }
        }
      }
    }
  }
`

export const NotificationsScreen = () => {
  const { data } = useQuery(GET_NOTIFICATIONS_QUERY)
  console.log(data)

  return (
    <SafeAreaView>
      <Text>Notifications</Text>
    </SafeAreaView>
  )
}
