import { useState, useEffect } from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import Button from '@mui/material/Button'

export function ConnectButtons() {
  const [mounted, setMounted] = useState(false)
  const { isConnected } = useAccount()

  const { connect } = useConnect({
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
        <Button variant="contained" onClick={() => disconnect()}>
          Disconnect
        </Button>
      ) : (
        <Button variant="outlined" onClick={() => connect()}>
          Connect Wallet
        </Button>
      )}
    </>
  )
}
