import { useEffect, useState } from 'react'
import { Alert, AlertTitle, Box, Button, Card } from '@mui/material'
import Link from 'next/link'
import { useAccount, useConnect, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi'
import Image from 'next/image'
import { Container } from '@mui/system'
import { Heading } from './shared/Typography'

export function Profile() {
  const { address, connector, isConnected } = useAccount()
  const { data: ensAvatar } = useEnsAvatar({ address })
  const { data: ensName } = useEnsName({ address })
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect()
  const { disconnect } = useDisconnect()

  if (isConnected) {
    return (
      <Container>
        {ensAvatar && <Image alt="ens avatar" src={ensAvatar || ''} />}
        <Card>{ensName ? `${ensName} (${address})` : address}</Card>
        <Card>Connected to {connector?.name}</Card>
        <Button onClick={() => disconnect()}>Disconnect</Button>
      </Container>
    )
  }

  return (
    <Box gap={2} display="flex" margin={5}>
      {connectors.map((connector) => (
        <Card key={connector.id}>
          <Button
            variant="contained"
            disabled={!connector.ready}
            key={connector.id}
            onClick={() => connect({ connector })}
          >
            {connector.name}
            {!connector.ready && ' (unsupported)'}
            {isLoading && connector.id === pendingConnector?.id && ' (connecting)'}
          </Button>
        </Card>
      ))}

      {error && <div>{error.message}</div>}
    </Box>
  )
}
function InstallMetamaskMessage() {
  return (
    <Alert
      severity="error"
      variant="filled"
      sx={{
        position: 'relative',
        zIndex: 1000,
      }}
    >
      <AlertTitle>Missing Required Extension</AlertTitle>A web3 wallet is required to play this game. Please install{' '}
      <Link
        href="https://metamask.io/download.html"
        target="_blank"
        style={{
          color: 'yellow',
          textDecoration: 'none',
          cursor: 'pointer',
        }}
      >
        Metamask
      </Link>{' '}
      and refresh the page.
    </Alert>
  )
}

export default function AppWrapper({ children }: { children: React.ReactNode }) {
  const [onboarding, setOnboarding] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (window && !window.ethereum) {
      setOnboarding(true)
    }
  }, [])

  if (!mounted) {
    return <></>
  }

  if (true) {
    return (
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Heading>Disabled</Heading>
      </Box>
    )
  }

  return (
    <>
      {onboarding && <InstallMetamaskMessage />}
      {children}
    </>
  )
}
