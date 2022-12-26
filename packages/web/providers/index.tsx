import { apolloClient } from '../lib/apolloClient'
import { ApolloProvider } from '@apollo/client'
import { ContentProvider } from './content'
import { FeatureProvider } from './feature'
import { MaterialProvider } from './material'
import { UserProvider } from './user'
import { WagmiProvider } from './wagmi'
import { ToastProvider } from './alert'
import { GameProvider } from './game'

export { useAccount, useDisconnect, useConnect, useNetwork } from './wagmi'
export { useContent, REQUEST_CONTENT, FIND_CONTENT } from './content'
export { useTheme } from './material'
export { useToast } from './alert'
export { useUser, CREATE_USER, FIND_USER, UPDATE_USER } from './user'
export { useFeature, ALL_FEATURES } from './feature'
export { useGame, type Task, TASK_ITEMS } from './game'

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={apolloClient}>
      <FeatureProvider>
        <ToastProvider>
          <MaterialProvider>
            <WagmiProvider>
              <ContentProvider>
                <UserProvider>
                  <GameProvider>{children}</GameProvider>
                </UserProvider>
              </ContentProvider>
            </WagmiProvider>
          </MaterialProvider>
        </ToastProvider>
      </FeatureProvider>
    </ApolloProvider>
  )
}
