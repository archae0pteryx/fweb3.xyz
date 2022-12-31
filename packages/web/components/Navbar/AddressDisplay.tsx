import { Typography } from '@mui/material'
import { useAccount } from 'wagmi'

export function AddressDisplay() {
  const { address } = useAccount()
  const displayName = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : ''
  return (
    <Typography color={address ? 'green' : 'red'} variant="caption">
      {displayName}
    </Typography>
  )
}
