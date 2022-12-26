import { Typography } from '@mui/material'
import { useUser } from '../../providers'

export function AddressDisplay() {
  const { displayName, isValidUser } = useUser()
  return (
    <Typography color={isValidUser ? 'green' : 'red'} variant="caption">
      {displayName}
    </Typography>
  )
}
