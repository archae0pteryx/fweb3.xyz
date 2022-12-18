import { Typography } from '@mui/material'
import { useAccount } from '../../providers'
import { useUser } from '../../providers/user'

export function AddressDisplay() {
  const { address, displayName } = useUser()
  const color = address === address ? 'yellow' : 'grey'
  if (!address) return null
  return (
    <Typography color={color} variant="caption">
      {displayName}
    </Typography>
  )
}
