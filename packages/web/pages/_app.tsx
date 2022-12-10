import type { AppProps } from 'next/app'
import { WagmiProvider, MaterialProvider, ApolloProvider } from '../providers'
import Layout from '../components/Layout'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MaterialProvider>
      <WagmiProvider>
        <ApolloProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ApolloProvider>
      </WagmiProvider>
    </MaterialProvider>
  )
}
