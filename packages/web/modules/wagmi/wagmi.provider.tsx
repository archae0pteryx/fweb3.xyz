// import { alchemyProvider } from 'wagmi/providers/alchemy'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
// import { infuraProvider } from 'wagmi/providers/infura'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { publicProvider } from 'wagmi/providers/public'
import { WagmiConfig, createClient, configureChains, chain } from 'wagmi'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

const { chains, webSocketProvider, provider } = configureChains(
  [chain.polygonMumbai, chain.polygon, chain.mainnet, chain.goerli],
  [
    // infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURA_API_KEY || '' }),
    // alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_MUMBAI || '' }),
    // alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_POLYGON || '' }),
    publicProvider(),
  ]
)

const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'fweb3',
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: 'Injected',
        shimDisconnect: true,
      },
    }),
  ],
  provider,
  webSocketProvider,
})

export function WagmiProvider({ children }: { children: React.ReactNode }) {
  return <WagmiConfig client={client}>{children}</WagmiConfig>
}
