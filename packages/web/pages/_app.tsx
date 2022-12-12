import { WagmiProvider, MaterialProvider, ApolloProvider, UserProvider, ToastProvider } from '../providers'
import Layout from '../components/Layout'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MaterialProvider>
      <WagmiProvider>
        <ApolloProvider>
          <UserProvider>
            <ToastProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </ToastProvider>
          </UserProvider>
        </ApolloProvider>
      </WagmiProvider>
    </MaterialProvider>
  )
}
