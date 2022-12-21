import { ApolloClient, gql, InMemoryCache } from '@apollo/client'


export const FIND_CONTENT = gql`
  query Query($types: [String]!) {
    findContent(types: $types) {
      id
      title
      html
      type
    }
  }
`
export const REQUEST_CONTENT = gql`
  mutation RequestContent($prompts: [PromptInputType]!) {
    requestContent(prompts: $prompts) {
      title
      html
      type
      id
    }
  }
`

export const apolloClient = new ApolloClient({
  uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql` || 'http://localhost:3000/api/graphql',
  cache: new InMemoryCache(),
})

