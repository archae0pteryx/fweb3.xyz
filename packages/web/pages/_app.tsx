import type { AppProps } from 'next/app'
import { WagmiProvider } from '../providers/wagmi'
import { MaterialThemeProvider } from '../providers/material'
import Layout from '../components/Layout'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MaterialThemeProvider>
      <WagmiProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </WagmiProvider>
    </MaterialThemeProvider>
  )
}
