import type { AppProps } from 'next/app'
import { WagmiProvider } from '../providers/wagmi'

import '../styles/theme'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider>
      <Component {...pageProps} />
    </WagmiProvider>
  )
}
