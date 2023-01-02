import { gql } from '@apollo/client'
export const FIND_FLAGS = gql`
  query Query($flags: [String!]) {
    findFeatures(flags: $flags) {
      flag
      value
    }
  }
`
