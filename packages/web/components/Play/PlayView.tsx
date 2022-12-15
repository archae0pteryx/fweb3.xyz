import { Tasks } from './Tasks'
import { Box } from '@mui/material'

export function PlayView() {
  return (
    <Box
      sx={{
        marginTop: '4em',
      }}
    >
      <Tasks />
    </Box>
  )
}
