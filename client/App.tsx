import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import useCachedResources from './hooks/useCachedResources'
import useColorScheme from './hooks/useColorScheme'
import Navigation from './navigation'

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

export default function App() {
  const isLoadingComplete = useCachedResources()
  const colorScheme = useColorScheme()

  if (!isLoadingComplete) {
    return null
  } else {
    const client = new ApolloClient({
      uri: 'http://localhost:3001/graphql',
      cache: new InMemoryCache(),
    })

    return (
      <ApolloProvider client={client}>
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </SafeAreaProvider>
      </ApolloProvider>
    )
  }
}
