import { WagmiProvider, MaterialProvider, ApolloProvider, UserDataProvider, ToastProvider } from '../providers'
import Layout from '../components/Layout'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MaterialProvider>
      <WagmiProvider>
        <ApolloProvider>
          <UserDataProvider>
            <ToastProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </ToastProvider>
          </UserDataProvider>
        </ApolloProvider>
      </WagmiProvider>
    </MaterialProvider>
  )
}
