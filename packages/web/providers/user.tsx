import { createContext, ReactNode, useContext, useState, useEffect } from 'react'
import { ErrorAlert } from '../components/Alerts'
import { gql, useLazyQuery } from '@apollo/client'
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
})

export const FIND_USER = gql`
  query Query($address: String!) {
    findUser(address: $address) {
      verified
      email
      disabled
      address
    }
  }
`

export const CREATE_USER = gql`
  mutation CreateUser($address: String!, $email: String!) {
    createUser(address: $address, email: $email) {
      email
      address
    }
  }
`

export function UserProvider({ children }: { children: ReactNode }) {
  const [onboarding, setOnboarding] = useState<boolean>(true)
  const { address, isConnected } = useAccount()
  const [showOnboardModal, setShowOnboardModal] = useState<boolean>(false)
  const [fetchUser, { data, loading, error, called }] = useLazyQuery(FIND_USER)

  const connectionReady = isConnected && address && !loading
  const foundUser = data?.findUser?.address

  if (connectionReady && !called) {
    fetchUser({ variables: { address } })
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

  const { address: userAddress, verified, role, discord, email, disabled } = data?.findUser || {}

  return (
    <UserContext.Provider
      value={{
        userAddress,
        foundUser: userAddress === address,
        verified: verified === 'true',
        role,
        discord,
        email,
        disabled,
        setShowOnboardModal,
        showOnboardModal,
        onboarding,
        loading,
        error: error?.message || '',
      }}
    >
      <ErrorAlert error={error?.message} />
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
