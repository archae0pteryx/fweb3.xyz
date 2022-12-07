import type { AppProps } from 'next/app'
import { WagmiProvider } from '../providers/wagmi'
import { MaterialThemeProvider } from '../providers/material'
import { UserProvider } from '../providers/user'
import { PrismaProvider } from '../providers/prisma'
import Layout from '../components/Layout'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MaterialThemeProvider>
      <WagmiProvider>
        <PrismaProvider>
          <UserProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </UserProvider>
        </PrismaProvider>
      </WagmiProvider>
    </MaterialThemeProvider>
  )
}
