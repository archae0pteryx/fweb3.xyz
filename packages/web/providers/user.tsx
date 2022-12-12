import { createContext, ReactNode, useContext } from 'react'
import { ErrorAlert } from '../components/Alerts'
import { gql, useLazyQuery } from '@apollo/client'
import { useAccount } from 'wagmi'

const UserContext = createContext({
  verified: false,
  email: '',
  disabled: false,
  loading: false,
  userAddress: '',
  refresh: () => {},
})

const FindUserQuery = gql`
  query Query($address: String!) {
    findUser(address: $address) {
      verified
      email
      disabled
      address
    }
  }
`

export function UserDataProvider({ children }: { children: ReactNode }) {
  const { address } = useAccount()
  const [fetchUser, { data, loading, error, called }] = useLazyQuery(FindUserQuery)

  if (address && !loading && !called) {
    fetchUser({ variables: { address } })
  }

  const refresh = () => {
    fetchUser({ variables: { address } })
  }

  return (
    <UserContext.Provider
      value={{
        ...data?.findUser,
        refresh,
        loading,
        error,
      }}
    >
      <ErrorAlert error={error?.message} />
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
