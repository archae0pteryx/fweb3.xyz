import { Box, Typography, Grid, Card } from '@mui/material'
import { useUser } from '../providers'
import { ConnectedLayout } from './ConnectedLayout'
import { FaCheck } from 'react-icons/fa'

interface IGameTaskItem {
  heading: string
  subheading: string
  description: string
  subtasks: IGameTaskItem[]
}

const GAME_TASKS: IGameTaskItem[] = [
  {
    heading: 'Task 1',
    subheading: 'Connect wallet and verify account',
    description: 'Learn and understand what a wallet is and how to connect it to the app',
    subtasks: [],
  },
]
      // <Card>
      //   <Box paddingY={1} display="flex" justifyContent="space-between" alignItems="center">
      //     <FaCheck size={30} color="#00FF19" />
      //     <Typography color="primary">Level 1</Typography>
      //   </Box>
      // </Card>
function TaskListItem({ task }: { task: IGameTaskItem }) {
  return (
    <Grid>
      <Typography variant="h6">{task.heading}</Typography>
      <Typography variant="subtitle1">{task.subheading}</Typography>
      <Typography variant="body1">{task.description}</Typography>
      <Box>
        {task.subtasks.map((subtask, i) => (
          <TaskListItem key={i} task={subtask} />
        ))}
      </Box>
    </Grid>
  )
}

export function TaskList() {
  return (
    <Box>

    </Box>
  )
}
