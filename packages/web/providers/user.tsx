import { createContext, ReactNode, useContext, useState, useEffect, useMemo } from 'react'
import { gql, useLazyQuery, useMutation } from '@apollo/client'
import { useAccount, useConnect, useDisconnect } from './wagmi'
import { useRouter } from 'next/router'
import { InjectedConnector } from 'wagmi/connectors/injected'

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
  refetchUser: async () => {},
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
  handleNewUser: (_email: string) => {},
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

  const [fetchUser, { data, loading: userLoading, error: userError, refetch, client }] = useLazyQuery(FIND_USER)

  const [fetchUpdateUser, { loading: mutationLoading, error: mutationError }] = useMutation(UPDATE_USER, {
    refetchQueries: ['FindUser'],
  })

  const [createuser, { loading: createUserLoading, error: createUserError }] = useMutation(CREATE_USER)

  const handleNewUser = async (email: string) => {
    try {
      await createuser({ variables: { address, email } })
    } catch (err) {
      console.log({ err })
    }
  }

  const connectUser = async () => {
    try {
      if (onboarding) {
        router.push('/onboard')
      }
      connect()
      await fetchUser({ variables: { address } })
    } catch (err) {
      console.log({ err })
    }
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

  useMemo(() => {
    if (address) {
      console.log('fetching user')
      fetchUser({ variables: { address } })
    }
  }, [address, fetchUser])

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

  const displayName = address ? address?.slice(0, 6) + '...' + address?.slice(-4) : ''
  const loading = userLoading || mutationLoading || wagmiLoading || isConnecting || createUserLoading || !initialized
  const isValidUser = initialized && isConnected && data?.findUser?.address === address || false

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
        setError,
        address,
        displayName,
        onboarding,
        setOnboarding,
        isValidUser,
        userLoading: loading,
        initialized,
        handleNewUser,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
