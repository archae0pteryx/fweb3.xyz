import { createContext, ReactNode, useContext, useState, useEffect, useMemo, useCallback } from 'react'
import { gql, useLazyQuery, useMutation } from '@apollo/client'
import { useAccount, useConnect, useDisconnect } from './wagmi'
import { useRouter } from 'next/router'
import { InjectedConnector } from 'wagmi/connectors/injected'

export const FIND_USER = gql`
  query Query($address: String!) {
    findUser(address: $address) {
      role
      email
      disabled
      address
      verified
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
const UserContext = createContext({
  email: '',
  verified: false,
  disabled: false,
  role: '',
  connectUser: async () => {},
  disconnectUser: async () => {},
  updateUser: async (_data: any) => {},
  isConnected: false,
  loading: false,
  error: '',
  setError: (_msg: string) => {},
  address: '',
  displayName: '',
  onboarding: false,
  setOnboarding: async () => {},
  isValidUser: false,
  userLoading: '',
  initialized: false,
  isConnecting: false,
  createUser: (_email: string) => {},
})

export function UserProvider({ children }: { children: ReactNode }) {
  const { address, isConnected, isConnecting } = useAccount()
  const [initialized, setInitialized] = useState(false)
  const [onboarding, setOnboarding] = useState(false)
  const [error, setError] = useState('')
  const { disconnect } = useDisconnect()
  const router = useRouter()

  const { connect, isLoading: wagmiLoading } = useConnect({
    connector: new InjectedConnector(),
  })

  const [
    fetchFindUser,
    { data: userData, called: userCalled, loading: userLoading, error: userError, refetch: refetchFindUser, client },
  ] = useLazyQuery(FIND_USER)

  const [fetchUpdateUser, { loading: mutationLoading, error: mutationError }] = useMutation(UPDATE_USER, {
    refetchQueries: ['FindUser'],
  })

  const [fetchCreateuser, { loading: createUserLoading, error: createUserError }] = useMutation(CREATE_USER)

  const createUser = async (email: string) => {
    await fetchCreateuser({ variables: { address, email } })
    await refetchFindUser({ variables: { address } })
  }

  const findUser = useCallback(async () => {
    if (!address) {
      console.log('no address to find user with')
      return
    }
    console.log('finding user')
    await fetchFindUser({ variables: { address } })
  }, [address, fetchFindUser])

  const connectUser = async () => {
    try {
      setError('')
      if (onboarding) {
        router.push('/onboard')
        return
      }
      connect()
    } catch (err: any) {
      console.log('CONNECT ERROR', err)
      setError(err.message)
    }
  }

  const disconnectUser = async () => {
    setError('')
    console.log('disconnecting')
    disconnect()
    client.resetStore()
    router.push('/')
  }

  const updateUser = async (data: any) => {
    setError('')
    await fetchUpdateUser({ variables: { data } })
  }

  useMemo(() => {
    const error = userError?.message || mutationError?.message || createUserError?.message || ''
    setError(error)
  }, [userError, mutationError, createUserError])

  useEffect(() => {
    if (window && !window.ethereum) {
      setOnboarding(true)
    }
    setInitialized(true)
    console.log('initialized')
  }, [])

  const foundUser = userData?.findUser

  // Initial user fetch
  if (address && isConnected && initialized && !foundUser && !userCalled && !userLoading) {
    console.log('initial user fetch')
    findUser()
  }

  const displayName = address ? address?.slice(0, 6) + '...' + address?.slice(-4) : ''
  const loading =
    userLoading || mutationLoading || wagmiLoading || isConnecting || createUserLoading || !initialized || false
  const isValidUser = (initialized && isConnected && foundUser?.address === address && foundUser.verified) || false
  return (
    <UserContext.Provider
      value={{
        ...foundUser,
        connectUser,
        disconnectUser,
        updateUser,
        isConnected,
        loading,
        error,
        setError,
        address,
        displayName,
        onboarding,
        setOnboarding,
        isValidUser,
        userLoading: loading,
        initialized,
        createUser,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
