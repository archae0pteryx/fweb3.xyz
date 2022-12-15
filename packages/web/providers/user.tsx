import { createContext, ReactNode, useContext, useState, useEffect } from 'react'
import { gql, useLazyQuery, useMutation } from '@apollo/client'
import { useAccount } from './wagmi'

const UserContext = createContext({
  verified: true,
  role: '',
  discord: '',
  email: '',
  disabled: false,
  userAddress: '',
  onboarding: true,
  showOnboardModal: false,
  setShowOnboardModal: (_: boolean) => {},
  loading: false,
  error: '',
  foundUser: false,
  displayName: '',
  handleFetchUser: () => {},
  handleUpdateUser: (_data: any) => {},
})

export const FIND_USER = gql`
  query Query($address: String!) {
    findUser(address: $address) {
      address
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
      address
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
      address
      email
      verified
      disabled
      role
    }
  }
`

export function UserProvider({ children }: { children: ReactNode }) {
  const [onboarding, setOnboarding] = useState<boolean>(true)
  const [user, setUser] = useState<any>()
  const { address, isConnected } = useAccount()
  const [showOnboardModal, setShowOnboardModal] = useState<boolean>(false)
  const [findUser, { loading: queryLoading, error: queryError, called: queryCalled }] = useLazyQuery(FIND_USER, {
    fetchPolicy: 'no-cache',
  })
  const [updateUser, { loading: mutationLoading, error: mutationError }] = useMutation(UPDATE_USER)
  const connectionReady = isConnected && address && !queryLoading
  const foundUser = user?.address === address

  const handleFetchUser = async () => {
    const { data: findData } = await findUser({ variables: { address } })
    if (findData?.findUser) {
      setUser(findData.findUser)
    }
  }

  const handleUpdateUser = async (data: any) => {
    const { data: updateData }: any = await updateUser({ variables: { data } })
    if (updateData?.updateUser) {
      setUser(updateData?.updateUser)
    }
  }

  if (connectionReady && !queryCalled) {
    console.log('Called fetchUser')
    handleFetchUser()
  }

  useEffect(() => {
    if (connectionReady && !foundUser) {
      setOnboarding(true)
      setShowOnboardModal(true)
    } else {
      setOnboarding(false)
      setShowOnboardModal(false)
    }
  }, [connectionReady, foundUser])

  const { address: userAddress, verified, role, discord, email, disabled } = user || {}
  const displayName = address ? address?.slice(0, 6) + '...' + address?.slice(-4) : ''
  return (
    <UserContext.Provider
      value={{
        userAddress,
        foundUser: userAddress && userAddress === address,
        verified,
        role,
        discord,
        email,
        disabled,
        setShowOnboardModal,
        showOnboardModal,
        onboarding,
        loading: queryLoading || mutationLoading,
        error: queryError?.message || mutationError?.message || '',
        displayName,
        handleFetchUser,
        handleUpdateUser,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
