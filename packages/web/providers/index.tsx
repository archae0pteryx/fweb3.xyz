import { ContentProvider } from './content'
import { MaterialProvider } from './material'
import { UserProvider } from './user'
import { WagmiProvider } from './wagmi'

export { useAccount, useDisconnect, useConnect, useNetwork } from './wagmi'
export { useContent } from './content'
export { useTheme } from './material'
export { useToast } from './alert'
export { useUser, CREATE_USER, FIND_USER, UPDATE_USER } from './user'

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <MaterialProvider>
      <WagmiProvider>
          <ContentProvider>
            <UserProvider>{children}</UserProvider>
          </ContentProvider>
      </WagmiProvider>
    </MaterialProvider>
  )
}
