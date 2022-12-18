import { ApolloProvider } from './apollo'
import { ContentProvider } from './content'
import { MaterialProvider } from './material'
import { UserProvider } from './user'
import { WagmiProvider } from './wagmi'

export { useAccount, useDisconnect, useConnect, useNetwork } from './wagmi'
export { useContent } from './content'
export { useLazyQuery, useQuery, useMutation } from './apollo'
export { useTheme } from './material'
export { useToast } from './alert'
export { useUser, CREATE_USER, FIND_USER, UPDATE_USER } from './user'

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <MaterialProvider>
      <WagmiProvider>
        <ApolloProvider>
          <ContentProvider>
            <UserProvider>{children}</UserProvider>
          </ContentProvider>
        </ApolloProvider>
      </WagmiProvider>
    </MaterialProvider>
  )
}
