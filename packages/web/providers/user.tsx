import { createContext, ReactNode, useContext, useState, useEffect, useMemo } from 'react'
import { gql, useLazyQuery, useMutation } from '@apollo/client'
import { useAccount, useConnect, useDisconnect } from './wagmi'
import { useRouter } from 'next/router'
import { InjectedConnector } from 'wagmi/connectors/injected';


export const FIND_USER = gql`
  query FindUser($address: String!) {
    findUser(address: $address) {
      email
      verified
      disabled
      role
    }
  }
`

export const CREATE_USER = gql`
  mutation CreateUser($address: String!, $email: String!) {
    createUser(address: $address, email: $email) {
      email
      verified
      disabled
      role
    }
  }
`

export const UPDATE_USER = gql`
  mutation UpdateUser($data: UserInputType) {
    updateUser(data: $data) {
      email
      verified
      disabled
      role
    }
  }
`
const UserContext = createContext({
  email: '',
  verified: false,
  disabled: false,
  role: '',
  connectUser: () => {},
  disconnectUser: () => {},
  refetchUser: () => {},
  updateUser: () => {},
  isConnected: false,
  loading: false,
  error: '',
  address: '',
  displayName: '',
  isOnboarding: false,
  isValidUser: false,
  userError: '',
  userLoading: '',
  initialized: false,
  isConnecting: false
})


export function UserProvider({ children }: { children: ReactNode }) {
  const [initialized, setInitialized] = useState(false)
  const { address, isConnected, isConnecting } = useAccount()
  const { disconnect } = useDisconnect()
  const router = useRouter()
  const { connect, isLoading: wagmiLoading } = useConnect({
    connector: new InjectedConnector(),
  })
  const [fetchUser, { data, loading: userLoading, error: useError, refetch, called, client }] = useLazyQuery(FIND_USER)
  const [fetchUpdateUser, { loading: mutationLoading, error: mutationError }] = useMutation(UPDATE_USER, {
    refetchQueries: ['FindUser'],
  })

  useMemo(() => {
    if (address) {
      console.log('fetching user')
      fetchUser({ variables: { address } })
    }
  }, [address])

  useEffect(() => {
    setInitialized(true)
    console.log('initialized')
  }, [])

  const connectUser = async () => {
    console.log('connecting')
    connect()
    await fetchUser({ variables: { address } })
  }

  const disconnectUser = async () => {
    console.log('disconnecting')
    disconnect()
    client.resetStore()
    router.push('/')
  }

  const updateUser = async (data: any) => {
    await fetchUpdateUser({ variables: { data } })
  }

  const displayName = address ? address?.slice(0, 6) + '...' + address?.slice(-4) : ''
  const error = useError?.message || mutationError?.message || ''
  const loading = userLoading || mutationLoading || wagmiLoading
  const isValidUser = initialized && isConnected && data?.findUser?.address === address
  const isOnboarding = initialized && isConnected && !isValidUser

  return (
    <UserContext.Provider
      value={{
        ...data?.findUser,
        connectUser,
        disconnectUser,
        refetchUser: refetch,
        updateUser,
        isConnected,
        loading,
        error,
        address,
        displayName,
        isOnboarding,
        isValidUser,
        userError: error,
        userLoading: loading,
        initialized,
        isConnecting
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
