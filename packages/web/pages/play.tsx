import { Button } from '@mui/material'
import { useState } from 'react'
import { useAccount, useConnect } from 'wagmi';
import Layout from '../components/Layout'
import { CreateAccountScreen } from '../components/Play/CreateAccountScreen'
import { GetStartedScreen } from '../components/Play/GetStartedScreen'
import { VerifyScreen } from '../components/Play/VerifyScreen'

interface IGameScreenProps {
  screen: number
  setScreen: (screen: number) => void
}

const GAME_SCREENS = [
  {
    name: 'get-started',
    component: GetStartedScreen
  },
  {
    name: 'create-account',
    component: CreateAccountScreen,
  },
  {
    name: 'verify-account',
    component: VerifyScreen,
  },
]


export function Profile() {
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect()

  return (
    <div>
      {connectors.map((connector) => (
        <button disabled={!connector.ready} key={connector.id} onClick={() => connect({ connector })}>
          {connector.name}
          {!connector.ready && ' (unsupported)'}
          {isLoading && connector.id === pendingConnector?.id && ' (connecting)'}
        </button>
      ))}

      {error && <div>{error.message}</div>}
    </div>
  )
}

export default function PlayPage(props: any) {
  const [screen, setScreen] = useState(0)
  const { connect } = useConnect()
  // return GAME_SCREENS[screen].component({
  //   ...props,
  //   screen,
  //   setScreen,
  // })
  return <Profile />
}
