import { gql } from '@apollo/client'

export const FIND_FLAGS = gql`
  query Query($flags: [String!]) {
    findFeatures(flags: $flags) {
      flag
      value
    }
  }
`

export const FEATURE_QUERY = gql`
  query FindFeature($flag: String!) {
    findFeature(flag: $flag) {
      value
    }
  }
`

