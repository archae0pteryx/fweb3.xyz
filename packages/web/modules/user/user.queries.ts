import { gql } from '@apollo/client'

export const FIND_USER = gql`
  query Query($address: String!) {
    findUser(address: $address) {
      id
      role
      disabled
      emailMessageId
      emailSentAt
      token
      salt
      address
      verified
      createdAt
      updatedAt
    }
  }
`

export const CREATE_USER = gql`
  mutation CreateUser($address: String!, $email: String!) {
    createUser(address: $address, email: $email) {
      id
    }
  }
`

export const UPDATE_USER = gql`
  mutation UpdateUser($data: UserInputType) {
    updateUser(data: $data) {
      id
    }
  }
`
