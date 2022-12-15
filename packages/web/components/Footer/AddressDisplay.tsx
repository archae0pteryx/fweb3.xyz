import { Typography } from '@mui/material'
import { useAccount } from '../../providers'
import { useUser } from '../../providers/user'

export function AddressDisplay() {
  const { address } = useAccount()
  const { userAddress, displayName } = useUser()
  const color = address === userAddress ? 'yellow' : 'grey'
  if (!address) return null
  return (
    <Typography color={color} variant="caption">
      {displayName}
    </Typography>
  )
}
