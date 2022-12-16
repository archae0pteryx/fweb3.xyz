import { createContext, ReactNode, useContext, useState, useEffect, useMemo } from 'react'
import { gql, useLazyQuery, useMutation } from '@apollo/client'
import { useAccount, useConnect, useDisconnect } from './wagmi'
import { useToast } from './toast'
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

  // if (address && isConnected && !called) {
  //   fetchUser({ variables: { address } })
  // }

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

// export function UserProvider({ children }: { children: ReactNode }) {
//   const router = useRouter()
//   const [onboarding, setOnboarding] = useState<boolean>(true)
//   const [user, setUser] = useState<any>()
//   const { triggerToast } = useToast()
//   const { address, isConnected } = useAccount()
//   const { disconnect } = useDisconnect()
//   const [showOnboardModal, setShowOnboardModal] = useState<boolean>(false)
//   const [findUser, { loading: queryLoading, error: queryError, called: queryCalled }] = useLazyQuery(FIND_USER, {
//     fetchPolicy: 'no-cache',
//   })
//   const [updateUser, { loading: mutationLoading, error: mutationError }] = useMutation(UPDATE_USER)
//   const connectionReady = isConnected && address && !queryLoading
//   const foundUser = user?.address === address

//   const handleFetchUser = async () => {
//     const { data: findData } = await findUser({ variables: { address } })
//     if (findData?.findUser) {
//       setUser(findData.findUser)
//     }
//   }

//   const handleUpdateUser = async (data: any) => {
//     const { data: updateData }: any = await updateUser({ variables: { data } })
//     if (updateData?.updateUser) {
//       setUser(updateData?.updateUser)
//     }
//   }

//   const handleDisconnectUser = () => {
//     setUser(null)
//     disconnect()
//     triggerToast('Disconnected')
//     router.push('/')
//   }

//   if (connectionReady && !queryCalled) {
//     console.log('Called fetchUser')
//     handleFetchUser()
//   }

//   useEffect(() => {
//     if (connectionReady && !foundUser) {
//       setOnboarding(true)
//       setShowOnboardModal(true)
//     } else {
//       setOnboarding(false)
//       setShowOnboardModal(false)
//     }
//   }, [connectionReady, foundUser])

//   const { address: userAddress, verified, role, discord, email, disabled } = user || {}
//   const displayName = address ? address?.slice(0, 6) + '...' + address?.slice(-4) : ''
//   return (
//     <UserContext.Provider
//       value={{
//         userAddress,
//         foundUser: userAddress && userAddress === address,
//         verified,
//         role,
//         discord,
//         email,
//         disabled,
//         setShowOnboardModal,
//         showOnboardModal,
//         onboarding,
//         loading: queryLoading || mutationLoading,
//         error: queryError?.message || mutationError?.message || '',
//         displayName,
//         handleFetchUser,
//         handleUpdateUser,
//         handleDisconnectUser,
//       }}
//     >
//       {children}
//     </UserContext.Provider>
//   )
// }

export const useUser = () => useContext(UserContext)
