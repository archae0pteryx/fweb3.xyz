import { Button } from '@mui/material'
import { useAccount } from 'wagmi'

export function ProfileButton() {
  const { isConnected } = useAccount()
  if (!isConnected) {
    return null
  }
  return <Button color="secondary">Profile</Button>
}
