import { ApolloClient, InMemoryCache } from '@apollo/client'
import { API_ENDPOINT } from './constants'

export const apolloClient = new ApolloClient({
  uri: `${API_ENDPOINT}/graphql`,
  cache: new InMemoryCache(),
})
