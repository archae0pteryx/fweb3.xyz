import { useState, useEffect } from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import LoadingButton from '@mui/lab/LoadingButton'

export function ConnectButtons() {
  const [mounted, setMounted] = useState(false)
  const { isConnected } = useAccount()
  const { connect, isLoading } = useConnect({
    connector: new InjectedConnector(),
  })
  const { disconnect } = useDisconnect()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <></>
  }

  return (
    <>
      {isConnected ? (
        <Button size="small" variant="contained" onClick={() => disconnect()}>
          Disconnect
        </Button>
      ) : (
        <LoadingButton
          loading={isLoading}
          loadingIndicator="Connecting..."
          size="small"
          variant="outlined"
          onClick={() => connect()}
        >
          Connect Wallet
        </LoadingButton>
      )}
    </>
  )
}
