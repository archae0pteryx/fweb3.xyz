// graphql/schema.ts

import { gql } from 'apollo-server-micro'

export const typeDefs = gql`
  type User {
    id: String
    address: String
  }

  type Query {
    users: [User]
  }
`
