import { useState, useEffect } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import Button from '@mui/material/Button'

export default function Page() {
  const [mounted, setMounted] = useState(false)
  const { address, isConnected } = useAccount()

  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const { disconnect } = useDisconnect()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div>
      {isConnected ? (
        <div>
          Connected to {address}
          <Button variant="contained" onClick={() => disconnect()}>
            Disconnect
          </Button>
        </div>
      ) : (
        <div>
          <Button variant="contained" onClick={() => connect()}>
            Connect Wallet
          </Button>
        </div>
      )}
    </div>
  )
}
