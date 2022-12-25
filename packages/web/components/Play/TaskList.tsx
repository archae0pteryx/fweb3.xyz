import { Box, Typography } from '@mui/material'
import { TaskItem } from './TaskItem'

const TASKS = [
  {
    title: 'Connect wallet & verify account',
  },
  {
    title: 'Add a custom network and tokens',
  },
  {
    title: 'Receive game tokens',
  },
]

export function TaskList() {
  return (
    <Box>
      <Typography variant="body2">TaskList</Typography>
      {TASKS.map((task, i) => (
        <TaskItem key={i} {...task} />
      ))}
    </Box>
  )
}
