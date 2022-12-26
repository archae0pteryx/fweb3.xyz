import { Typography } from '@mui/material'
import { useUser } from '../../providers'

export function AddressDisplay() {
  const { displayName, id } = useUser()
  return (
    <Typography color={id ? 'green' : 'red'} variant="caption">
      {displayName}
    </Typography>
  )
}
