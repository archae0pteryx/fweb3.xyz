import type { AppProps } from 'next/app'
import { MaterialProvider } from '../material/theme.provider'
import { ApolloProvider } from '@apollo/client'
import { apolloClient } from '../graphql/apollo'
import { WagmiProvider } from '../modules/wagmi/wagmi.provider'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider>
      <ApolloProvider client={apolloClient}>
        <MaterialProvider>
          <Component {...pageProps} />
        </MaterialProvider>
      </ApolloProvider>
    </WagmiProvider>
  )
}
