import { InMemoryCache, makeVar } from '@apollo/client'

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        currentUser: {
          read() {
            return currentUserVar()
          },
        },
      },
    },
  },
})

export const currentUserVar = makeVar(null)
