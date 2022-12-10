import { gql, useLazyQuery } from '@apollo/client'
import { useEffect } from 'react'
import { useAccount } from 'wagmi'

const FindUserQuery = gql`
  query FindUser($address: String!) {
    findUser(address: $address) {
      address
      id
    }
  }
`

export default function Page() {
  const { address } = useAccount()
  const [findUser, { data, loading, error }] = useLazyQuery(FindUserQuery)
  useEffect(() => {
    if (address) {
      findUser({ variables: { address } })
    }
  })

  if (error) {
    return <pre>{error.message}</pre>
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return <div>{JSON.stringify(data)}</div>
}
