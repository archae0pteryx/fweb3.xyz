import Button from '@mui/material/Button'
import { useUser, useAccount } from '../../providers'

export function DisconnectButton() {
  const { isConnected } = useAccount()
  const { handleDisconnectUser } = useUser()
  if (!isConnected) {
    return null
  }

  return (
    <Button color="warning" variant="outlined" onClick={() => handleDisconnectUser()}>
      Disconnect
    </Button>
  )
}
