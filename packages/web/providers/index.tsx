import { apolloClient } from '../lib/apolloClient'
import { ApolloProvider } from '@apollo/client'
import { ContentProvider } from './content'
import { FeatureProvider } from './feature'
import { MaterialProvider } from './material'
import { UserProvider } from './user'
import { WagmiProvider } from './wagmi'

export { useAccount, useDisconnect, useConnect, useNetwork } from './wagmi'
export { useContent, REQUEST_CONTENT, FIND_CONTENT } from './content'
export { useTheme } from './material'
export { useToast } from './alert'
export { useUser, CREATE_USER, FIND_USER, UPDATE_USER } from './user'
export { useFeature } from './feature'

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={apolloClient}>
      <FeatureProvider>
        <MaterialProvider>
          <WagmiProvider>
            <ContentProvider>
              <UserProvider>{children}</UserProvider>
            </ContentProvider>
          </WagmiProvider>
        </MaterialProvider>
      </FeatureProvider>
    </ApolloProvider>
  )
}
