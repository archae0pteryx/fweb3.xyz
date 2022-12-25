import { Box, Typography } from '@mui/material'
import { TaskList } from './TaskList'

export function PlayerProgress() {
  return (
    <Box>
      <Typography variant="h6">PlayerProgress</Typography>
      <TaskList />
    </Box>
  )
}
