import { gql } from '@apollo/client'

export interface IContentInputType {
  prompt: string
  type: string
  title: string
}

export const CREATE_CONTENT = gql`
  mutation Mutation($data: ContentInputType!) {
    createContent(data: $data) {
      type
      title
      html
    }
  }
`

export const FIND_CONTENT = gql`
  query Query($type: String!) {
    findContent(type: $type) {
      html
      title
    }
  }
`
export const REQUEST_CONTENT = gql`
  query Query($type: String, $types: [String]) {
    requestContent(type: $type, types: $types) {
      title
      html
    }
  }
`
