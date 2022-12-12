import { Button } from '@mui/material'
import { useAccount, useDisconnect } from 'wagmi'
import { useToast } from '../../providers'

export function DisconnectButton() {
  const { disconnect } = useDisconnect()
  const { isConnected } = useAccount()
  const { triggerToast } = useToast()

  const handleDisconnect = async () => {
    await disconnect()
    triggerToast('Disconnected')
  }

  if (!isConnected) {
    return null
  }

  return (
    <Button color='warning' size="small" onClick={() => handleDisconnect()}>
      Disconnect
    </Button>
  )
}
