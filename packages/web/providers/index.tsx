import { ApolloProvider } from './apollo'
import { ErrorAlertProvider } from './error'
import { MaterialProvider } from './material'
import { ToastProvider } from './toast'
import { UserProvider } from './user'
import { WagmiProvider } from './wagmi'

export { useAccount, useDisconnect, useConnect, useNetwork } from './wagmi'
export { useError } from './error'
export { useLazyQuery, useQuery, useMutation } from './apollo'
export { useTheme } from './material'
export { useToast } from './toast'
export { useUser, CREATE_USER, FIND_USER, UPDATE_USER } from './user'

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <MaterialProvider>
      <WagmiProvider>
        <ApolloProvider>
          <UserProvider>
            <ErrorAlertProvider>
              <ToastProvider>{children}</ToastProvider>
            </ErrorAlertProvider>
          </UserProvider>
        </ApolloProvider>
      </WagmiProvider>
    </MaterialProvider>
  )
}
