import { ApolloProvider as Apollo, ApolloClient, InMemoryCache } from '@apollo/client'

const apolloClient = new ApolloClient({
  uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
  cache: new InMemoryCache(),
})

export default apolloClient

export function ApolloProvider({ children }: { children: React.ReactNode }) {
  return <Apollo client={apolloClient}>{children}</Apollo>
}

export { useLazyQuery, useQuery, useMutation } from '@apollo/client'
