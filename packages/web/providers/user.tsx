import { createContext, ReactNode, useContext, useState, useEffect, useMemo, useCallback } from 'react'
import { gql, useLazyQuery, useMutation } from '@apollo/client'
import { useAccount, useConnect, useDisconnect } from './wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

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

interface IUserContext {
  createUser: (email: string) => void
  connectUser: () => Promise<void>
  disconnectUser: () => Promise<void>
  updateUser: (data: any) => Promise<void>
  emailSentAt: string
  id?: string
  foundAddress: string
  emailMessageId?: string
  verified?: boolean
  disabled?: boolean
  role?: string
  isAdmin: boolean
  isConnected: boolean
  loading: boolean
  error: string
  setError: (msg: string) => void
  address: string
  displayName: string
  onboarding: boolean
  setOnboarding: (onboarding: boolean) => void
  isValidUser: boolean
  userLoading: string
  initialized: boolean
  isConnecting: boolean
  resendVerifyEmail: () => Promise<void>
}

const UserContext = createContext({
  id: '',
  verified: false,
  disabled: false,
  role: '',
  emailMessageId: '',
  emailSentAt: '',
  connectUser: async () => {},
  disconnectUser: async () => {},
  updateUser: async (_data: any) => {},
  isConnected: false,
  loading: false,
  error: '',
  setError: (_msg: string) => {},
  address: '',
  foundAddress: '',
  displayName: '',
  onboarding: false,
  setOnboarding: async () => {},
  isValidUser: false,
  userLoading: '',
  initialized: false,
  isConnecting: false,
  createUser: (_email: string) => {},
  isAdmin: false,
  resendVerifyEmail: async () => {},
})

export function UserProvider({ children }: { children: ReactNode }) {
  const { address, isConnected, isConnecting } = useAccount()
  const [isAdmin, setIsAdmin] = useState(false)
  const [initialized, setInitialized] = useState(false)
  const [onboarding, setOnboarding] = useState(false)
  const [error, setError] = useState('')
  const { disconnect } = useDisconnect()

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
    try {
      setError('')
      await fetchCreateuser({ variables: { address, email } })
      await refetchFindUser({ variables: { address } })
    } catch (err: any) {
      setError(err.message)
    }
  }

  const findUser = useCallback(async () => {
    try {
      if (!address) {
        console.log('no address to find user with')
        return
      }
      console.log('finding user')
      await fetchFindUser({ variables: { address } })
    } catch (err: any) {
      console.error(err)
      setError(err.message)
    }
  }, [address, fetchFindUser])

  const connectUser = async () => {
    try {
      setError('')
      connect()
    } catch (err: any) {
      setError(err.message)
    }
  }

  const disconnectUser = async () => {
    console.log('disconnecting')
    setError('')
    disconnect()
  }

  const updateUser = async (data: any) => {
    setError('')
    await fetchUpdateUser({ variables: { data } })
  }

  const resendVerifyEmail = async () => {
    ///
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

  useEffect(() => {
    if (address === process.env.NEXT_PUBLIC_ADMIN) {
      setIsAdmin(true)
    }
    if (address) {
      findUser()
    } else {
      console.debug('resetting gql store')
      client.resetStore()
    }
    // eslint-disable-next-line
  }, [address])

  const foundUser = userData?.findUser

  // if (foundUser?.address !== address) {
  //   setError('User mismatch! Please refresh the page.')
  // }
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
        resendVerifyEmail,
        foundAddress: '',
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
        isAdmin,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
