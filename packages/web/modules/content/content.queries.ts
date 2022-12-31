import { gql } from '@apollo/client'

export const CREATE_CONTENT = gql`
  mutation Mutation($data: ContentInputType!) {
    createContent(data: $data) {
      type
      id
      title
      html
    }
  }
`

export const FIND_CONTENT = gql`
  query Query($types: [String]!) {
    findContent(types: $types) {
      title
      html
      type
    }
  }
`
export const REQUEST_CONTENT = gql`
  query Query($types: [String]!) {
    requestContent(types: $types) {
      html
      type
    }
  }
`
