import { apolloClient } from '../graphql/apollo'
import { ApolloProvider } from '@apollo/client'
import { Backdrop, CircularProgress } from '@mui/material'
import { MaterialProvider } from '../material/theme.provider'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { WagmiProvider } from '../modules/wagmi/wagmi.provider'
import AppWrapper from '../components/AppWrapper'
import type { AppProps } from 'next/app'

const LoadingOverlay = ({ loading }: { loading: boolean }) => {
  return (
    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const handleStart = (url: string) => url !== router.asPath && setLoading(true)
    const handleComplete = (url: string) => url === router.asPath && setLoading(false)

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
    }
  })
  return (
    <WagmiProvider>
      <ApolloProvider client={apolloClient}>
        <MaterialProvider>
          <AppWrapper>
            <LoadingOverlay loading={loading} />
            <Component {...pageProps} />
          </AppWrapper>
        </MaterialProvider>
      </ApolloProvider>
    </WagmiProvider>
  )
}
