import { Typography } from '@mui/material'
import { useUser } from '../../providers'

export function AddressDisplay() {
  const { displayName } = useUser()
  return (
    <Typography color="yellow" variant="caption">
      {displayName}
    </Typography>
  )
}
