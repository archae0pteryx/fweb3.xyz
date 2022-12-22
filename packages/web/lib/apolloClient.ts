import { ApolloClient, InMemoryCache } from '@apollo/client'

export const apolloClient = new ApolloClient({
  uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql` || 'http://localhost:3000/api/graphql',
  cache: new InMemoryCache(),
})

